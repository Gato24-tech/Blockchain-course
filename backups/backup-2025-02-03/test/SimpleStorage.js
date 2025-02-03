const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage Contract", function () {
    let SimpleStorage, simpleStorage, owner, otherAccount;

    // Se ejecuta antes de cada prueba para desplegar un nuevo contrato
    beforeEach(async function () {
        [owner, otherAccount] = await ethers.getSigners(); // Obtén las cuentas
        SimpleStorage = await ethers.getContractFactory("SimpleStorage"); // Crea la factory
        simpleStorage = await SimpleStorage.connect(owner).deploy(); // Despliega el contrato con el owner
        await simpleStorage.waitForDeployment(); // Para ethers.js v6
    });

    it("Should store and retrieve a value", async function () {
        // El propietario establece un valor
        await simpleStorage.connect(owner).set(42);
        // Verifica el valor almacenado
        expect(await simpleStorage.get()).to.equal(42);
    });

    it("Should emit ValueChanged event", async function () {
        // El propietario establece un valor y se espera que emita el evento
        await expect(simpleStorage.connect(owner).set(100))
            .to.emit(simpleStorage, "ValueChanged")
            .withArgs(100);
    });

    it("Should only allow the owner to call set", async function () {
        // Un usuario no autorizado intenta establecer un valor
        await expect(
            simpleStorage.connect(otherAccount).set(42)
        ).to.be.revertedWith("Only the owner can call this function");
    });
});

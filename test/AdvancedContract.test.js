const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AdvancedContract with Access Control", function () {
    let contract, owner, otherUser;

    before(async function () {
        // Obtén las cuentas desde Hardhat
        [owner, otherUser] = await ethers.getSigners();

        // Desplegar el contrato con la cuenta "owner"
        const AdvancedContract = await ethers.getContractFactory("AdvancedContract");
        contract = await AdvancedContract.connect(owner).deploy();
        await contract.waitForDeployment(); // Cambiado para ethers.js v6
    });

    it("Should initialize with a value of 0", async function () {
        // Verificar que el valor inicial es 0
        expect(await contract.getValue()).to.equal(0);
    });

    it("Should allow the owner to set a value and emit an event", async function () {
        // El propietario establece un valor
        const newValue = 100;
        await expect(contract.connect(owner).setValue(newValue))
            .to.emit(contract, "ValueUpdated") //Cambio el nombre del evento
            .withArgs(0, newValue); //Comprobar oldValue y newValue
    });

    it("Should not allow non-owners to set a value", async function () {
        // Otra cuenta intenta establecer un valor (debe fallar)
        await expect(contract.connect(otherUser).setValue(200)).to.be.revertedWith(
            "Not authorized: Only owner can set value"
        );
    });

    it("Should allow anyone to get the value", async function () {
        // El propietario establece un valor
        const newValue = 100;
        await contract.connect(owner).setValue(newValue);

        // Cualquier usuario puede leer el valor
        expect(await contract.connect(otherUser).getValue()).to.equal(100);
    });
});

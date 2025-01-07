const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AdvancedContract Testing", function () {
    let AdvancedContract, contract, owner, otherUser;

    before(async function () {
        // Obtener cuentas desde Hardhat
        [owner, otherUser] = await ethers.getSigners();

        // Obtener la fábrica del contrato
        AdvancedContract = await ethers.getContractFactory("AdvancedContract");

        // Desplegar el contrato con el owner
        contract = await AdvancedContract.connect(owner).deploy();
        await contract.waitForDeployment(); // Cambiado para ethers v6
    });

    it("Should set the initial value to 0", async function () {
        // Comprobar que el valor inicial es 0
        const initialValue = await contract.getValue();
        expect(initialValue).to.equal(0);
    });

    it("Should emit an event when a value is set", async function () {
        // Probar la emisión del evento al establecer un nuevo valor
        const newValue = 42;
        await expect(contract.connect(owner).setValue(newValue))
            .to.emit(contract, "ValueSet")
            .withArgs(newValue);
    });

    it("Should allow only the owner to set a value", async function () {
        // El propietario puede establecer un valor
        const newValue = 100;
        await contract.connect(owner).setValue(newValue);

        // Un usuario no autorizado intenta establecer un valor (debe fallar)
        await expect(contract.connect(otherUser).setValue(200)).to.be.revertedWith(
            "Not authorized: Only owner can set value"
        );

        // Verificar que el valor no cambió
        const storedValue = await contract.getValue();
        expect(storedValue).to.equal(newValue);
    });

    it("Should allow anyone to get the value", async function () {
        // Obtener el valor como otro usuario
        const value = await contract.connect(otherUser).getValue();
        expect(value).to.equal(100); // El valor debe ser el último establecido por el owner
    });
});

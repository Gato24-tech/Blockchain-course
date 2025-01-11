const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AdvancedContract Basic Tests", function () {
    let contract, owner, otherUser;

    beforeEach(async function () {
        // Obtener las cuentas desde Hardhat
        [owner, otherUser] = await ethers.getSigners();

        // Crear la fábrica y desplegar el contrato con la cuenta del propietario
        const AdvancedContract = await ethers.getContractFactory("AdvancedContract");
        contract = await AdvancedContract.connect(owner).deploy();
        await contract.waitForDeployment(); // Compatibilidad con ethers.js v6
    });

    it("Should initialize with the correct owner", async function () {
        expect(await contract.getOwner()).to.equal(owner.address);
    });

    it("Should return the initial value as 0", async function () {
        expect(await contract.getValue()).to.equal(0);
    });

    it("Should allow the owner to update the value", async function () {
        const newValue = 42;
        await contract.connect(owner).setValue(newValue);
        expect(await contract.getValue()).to.equal(newValue);
    });

    it("Should emit ValueUpdated event when the value is updated", async function () {
        const newValue = 200;
        await expect(contract.connect(owner).setValue(newValue))
            .to.emit(contract, "ValueUpdated")
            .withArgs(0, newValue); // Comparar oldValue (0) y newValue (200)
    });

    it("Should not allow non-owners to update the value", async function () {
        const newValue = 300;
        await expect(contract.connect(otherUser).setValue(newValue))
            .to.be.revertedWith("Not authorized: Only owner can set value");
    });
});

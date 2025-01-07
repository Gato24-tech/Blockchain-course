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

    it("Should set the owner as the deployer", async function () {
        // Verificar que el propietario es la cuenta que desplegó el contrato
        expect(await contract.getOwner()).to.equal(owner.address);
    });

    it("Should allow the owner to set a value", async function () {
        // El propietario establece un valor
        await expect(contract.connect(owner).setValue(100))
            .to.emit(contract, "ValueSet")
            .withArgs(100);
    });

    it("Should not allow non-owners to set a value", async function () {
        // Otra cuenta intenta establecer un valor (debe fallar)
        await expect(contract.connect(otherUser).setValue(200)).to.be.revertedWith(
            "Not authorized: Only owner can set value"
        );
    });

    it("Should allow anyone to get the value", async function () {
        // El propietario establece un valor
        await contract.connect(owner).setValue(100);

        // Cualquier usuario puede leer el valor
        expect(await contract.connect(otherUser).getValue()).to.equal(100);
    });
});

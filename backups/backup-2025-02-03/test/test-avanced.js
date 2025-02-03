const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AdvancedContract Expanded Tests", function () {
    let contract, owner, otherUser;

    beforeEach(async function () {
        [owner, otherUser] = await ethers.getSigners();

        const AdvancedContract = await ethers.getContractFactory("AdvancedContract");
        contract = await AdvancedContract.connect(owner).deploy();
        await contract.waitForDeployment();
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
            .withArgs(0, newValue);
    });

    it("Should not allow non-owners to update the value", async function () {
        const newValue = 300;
        await expect(contract.connect(otherUser).setValue(newValue))
            .to.be.revertedWith("Not authorized: Only owner can set value");
    });

    it("Should not allow setting a value above the limit", async function () {
        const invalidValue = 2000; // Exceeds the limit of 1000
        await expect(contract.connect(owner).setValue(invalidValue))
            .to.be.revertedWith("Value exceeds limit");
    });

    it("Should increment the value within the limit", async function () {
        await contract.connect(owner).setValue(500); // Set initial value
        await contract.connect(owner).incrementValue(200); // Increment within limit
        expect(await contract.getValue()).to.equal(700);
    });

    it("Should not allow incrementing the value above the limit", async function () {
        await contract.connect(owner).setValue(900); // Set near the limit
        await expect(contract.connect(owner).incrementValue(200)) // Exceeds limit
            .to.be.revertedWith("Value exceeds limit");

        const highIncrement = 2000; // Increment itself exceeds the limit
        await expect(contract.connect(owner).incrementValue(highIncrement))
            .to.be.revertedWith("Increment exceeds limit");
    });

    it("Should maintain correct value history", async function () {
        await contract.connect(owner).setValue(10);
        await contract.connect(owner).incrementValue(20);
        await contract.connect(owner).setValue(100);
        const history = await contract.getValueHistory();
        expect(history).to.deep.equal([0, 10, 30, 100]);
    });
});

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

    it("Should maintain correct value history", async function () {
        await contract.connect(owner).setValue(10);
        await contract.connect(owner).incrementValue(20);
        await contract.connect(owner).setValue(100);
        const history = await contract.getValueHistory();
        expect(history.map(value => value.toNumber())).to.deep.equal([0, 10, 30, 100]);
    });
});

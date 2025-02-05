const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

    const AdvancedContract = await hre.ethers.getContractFactory("AdvancedContract");
    const advancedContract = await AdvancedContract.deploy({
        gasLimit: 5000000, // Límite de gas
    });

    await advancedContract.waitForDeployment();

    console.log("AdvancedContract deployed to:", advancedContract.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

const hre = require("hardhat");

async function main() {
    // Obtén la lista de cuentas disponibles
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Obtén el balance de la cuenta
    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

    // Despliega el contrato
    const AdvancedContract = await hre.ethers.getContractFactory("AdvancedContract");
    const advancedContract = await AdvancedContract.deploy();

    await advancedContract.waitForDeployment();

    console.log("AdvancedContract deployed to:", advancedContract.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

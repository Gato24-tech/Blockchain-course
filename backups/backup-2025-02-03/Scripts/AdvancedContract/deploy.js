const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

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

    const contractAddress = advancedContract.target;
    console.log("AdvancedContract deployed to:", contractAddress);

    // Ruta al archivo de despliegues
    const deploymentsFile = path.join(__dirname, "../../deployments.json");

    // Cargar datos anteriores si existen
    let deployments = {};
    if (fs.existsSync(deploymentsFile)) {
        deployments = JSON.parse(fs.readFileSync(deploymentsFile, "utf8"));
    }

    // Guardar la nueva dirección
    deployments["AdvancedContract"] = contractAddress;
    fs.writeFileSync(deploymentsFile, JSON.stringify(deployments, null, 2));

    console.log("Deployment address saved to deployments.json");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */

const hre = require("hardhat");
const fs = require("fs");
const path = require("path");


// Definir __dirname en caso de ESM
const __dirname = path.resolve();

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

    const AdvancedContract = await hre.ethers.getContractFactory("AdvancedContract");
    const advancedContract = await AdvancedContract.deploy({ gasLimit: 5000000 });
    await advancedContract.waitForDeployment();

    const contractAddress = advacedntract.target;
    console.log("AdvancedContract deployed to:", contractAddress);

    // Ruta al archivo de desployments.json en la raíz del proyecto
    const deploymentsPath = path.join(__dirname, "deployments.json");
    
    let deployments = {};
    if (fs.existsSync(deploymentsPath)) {
        deployments = JSON.parse(fs.readFileSync(deploymentsPath, "utf8"));
    }

    // Guardar la nueva dirección
    deployments["AdvancedContract"] = contractAddress;
    fs.writeFileSync(deploymentsPath, JSON.stringify(deployments, null, 2));

    console.log("Deployment address saved to deployments.json");

    //copiar deployment.json al frontend
    const frontendPath = path.join(__dirname, "frontend/public/deployments,json");
    fs.copyFileSync(deploymentsPath, frontendPath);
    console.log("Deployments address coied to frontend/public/deployments.json");
}

// Manejo de errores
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

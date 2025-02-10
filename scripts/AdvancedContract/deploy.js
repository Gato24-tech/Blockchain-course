/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */

const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

// Definir __dirname en caso de ESM
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

    const AdvancedContract = await hre.ethers.getContractFactory("AdvancedContract");
    const advancedContract = await AdvancedContract.deploy({ gasLimit: 5000000 });
    await advancedContract.waitForDeployment();

    const contractAddress = advancedContract.target;
    console.log("AdvancedContract deployed to:", contractAddress);

    // Ruta al archivo de despliegues
    const deploymentsPath = path.join(__dirname, "../../deployments.json");
    fs.writeFileSync(deploymentsPath, JSON.stringify({ address: contractAddress }, null, 2));

    // Cargar datos anteriores si existen
    let deployments = {};
    if (fs.existsSync(deploymentsPath)) {
        deployments = JSON.parse(fs.readFileSync(deploymentsPath, "utf8"));
    }

    // Guardar la nueva dirección
    deployments["AdvancedContract"] = contractAddress;
    fs.writeFileSync(deploymentsPath, JSON.stringify(deployments, null, 2));

    console.log("Deployment address saved to deployments.json");
}

// Manejo de errores
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

/* eslint-disable no-undef */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import hardhat from "hardhat";

const { ethers } = hardhat;

// Definir __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const AdvancedContract = await ethers.getContractFactory("AdvancedContract");
  const advancedContract = await AdvancedContract.deploy();
  await advancedContract.waitForDeployment();

  const contractAddress = await advancedContract.getAddress();
  const contractABI = AdvancedContract.interface.formatJson(); // Guardamos el ABI

  console.log("Contract deployed to:", contractAddress);

  // Guardar en deployments.json
  const deploymentsPath = path.join(__dirname, "../../frontend/public/deployments.json");

  // Verificar si el directorio existe, si no, crearlo
  const deploymentsDir = path.dirname(deploymentsPath);
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const deploymentData = {
    localhost: {
      address: contractAddress,
      abi: contractABI, // Ahora también guardamos el ABI
    }
  };

  fs.writeFileSync(deploymentsPath, JSON.stringify(deploymentData, null, 2));
  console.log("Deployment data saved to:", deploymentsPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

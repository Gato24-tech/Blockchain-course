/* eslint-disable no-undef */
import fs from "fs";
import path from "path";
import hardhat from "hardhat";

const { ethers } = hardhat;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const AdvancedContract = await ethers.getContractFactory("AdvancedContract");
  const advancedContract = await AdvancedContract.deploy();
  await advancedContract.waitForDeployment();

  const contractAddress = await advancedContract.getAddress();
  console.log("Contract deployed to:", contractAddress);

  // ✅ Ruta corregida para obtener el ABI del contrato
  const artifactsPath = path.join(
    path.resolve(),
    "artifacts",
    "contracts",
    "AdvancedContract.sol",
    "AdvancedContract.json"
  );

  if (!fs.existsSync(artifactsPath)) {
    throw new Error(`No se encontró el archivo ABI en ${artifactsPath}`);
  }

  // ✅ Leer el ABI desde el archivo JSON
  const contractArtifact = JSON.parse(fs.readFileSync(artifactsPath, "utf8"));
  const contractABI = contractArtifact.abi;

  // ✅ Ruta corregida para guardar deployments.json
  const deploymentsPath = path.join(path.resolve(), "frontend/public/deployments.json");

  // ✅ Verificar si el directorio existe, si no, crearlo
  const deploymentsDir = path.dirname(deploymentsPath);
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  // ✅ Crear el objeto de despliegue con la dirección y ABI
  const deploymentData = {
    localhost: {
      address: contractAddress,
      abi: contractABI, // ✅ Guardamos el ABI correctamente
    },
  };

  fs.writeFileSync(deploymentsPath, JSON.stringify(deploymentData, null, 2));
  console.log("Deployment address and ABI saved to:", deploymentsPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import hardhat from "hardhat";
import process from "process";


const { ethers } = hardhat;

// Definir __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta correcta al deployments.json
const deploymentsPath = path.join(__dirname, "../../frontend/public/deployments.json");

// Verificar si el archivo existe
if (!fs.existsSync(deploymentsPath)) {
  throw new Error(`No se encontró deployments.json en la ruta: ${deploymentsPath}`);
}

// Leer deployments.json
const deployments = JSON.parse(fs.readFileSync(deploymentsPath, "utf-8"));

// Verificar que exista la dirección del contrato en el archivo
if (!deployments.localhost || !deployments.localhost.address) {
  throw new Error("No se encontró la dirección del contrato en deployments.json");
}

const contractAddress = deployments.localhost.address;
console.log("Usando contrato en dirección:", contractAddress);

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Interacting with the contract using account:", deployer.address);

  // Adjuntar el contrato correcto
  const AdvancedContract = await ethers.getContractFactory("AdvancedContract");
  const advancedContract = AdvancedContract.attach(contractAddress);

  console.log("Available contract functions:", Object.keys(advancedContract));

  // Obtener el valor almacenado
  const currentValue = await advancedContract.getValue();
  console.log("Current stored value:", currentValue.toString());
}

main()
 .then(() => process.exit(0))
 .catch((error) => {
  console.error(error);
  process.exit(1);
});
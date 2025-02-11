/* eslint-disable no-undef */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

if (!contractAddress) {
  throw new Error("No se encontró la dirección del contrato en deployments.json");
}


const deploymentsPath = path.join(__dirname, "frontend/public/deployments.json");

//Leer la dirección del contrato
const deployments = JSON.parse(fs.readFileSync(deploymentsPath, "utf8"));
const contractAddress = deployments[advancedContract];

console.log("Contrato desplegado en:", contractAddress);

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Interacting with the contract using account:", deployer.address);


  // Adjuntar el contrato correcto
  const AdvancedContract = await ethers.getContractFactory("AdvancedContract");
  const advancedContract = AdvancedContract.attach(contractAddress);

  // 📌 Verificar las funciones disponibles
  console.log("Available contract functions:", Object.keys(advancedContract));

  // Obtener el valor almacenado
  const currentValue = await advancedContract.getValue();
  console.log("Current stored value:", currentValue.toString());

  // Cambiar el valor almacenado
  const tx = await advancedContract.setValue(42);
  await tx.wait();
  console.log("Value updated to 42.");

  // Verificar el nuevo valor
  const updatedValue = await advancedContract.getValue();
  console.log("Updated stored value:", updatedValue.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

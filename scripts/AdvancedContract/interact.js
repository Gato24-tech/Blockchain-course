/* eslint-disable no-undef */
import fs from "fs";
import path from "path";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Interacting with the contract using account:", deployer.address);

  // Cargar la dirección desde deployments.json
  const deploymentsPath = path.join(__dirname,"deployments.json");
  const deployments = JSON.parse(fs.readFileSync(deploymentsPath, "utf-8"));

  console.log("Contracto desplegado en:", deployments.address);

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

const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Interacting with the contract using account:", deployer.address);

  // Dirección del contrato desplegado
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Usa la dirección que se imprimió al desplegar

  // Obtén la fábrica del contrato y adjunta la dirección desplegada
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = SimpleStorage.attach(contractAddress);

  // Llama a la función `get` para obtener el valor inicial
  const currentValue = await simpleStorage.get();
  console.log("Current stored value:", currentValue.toString());

  // Llama a la función `set` para cambiar el valor
  const tx = await simpleStorage.set(42);
  await tx.wait(); // Espera a que se mine la transacción
  console.log("Value updated to 42.");

  // Verifica el nuevo valor
  const updatedValue = await simpleStorage.get();
  console.log("Updated stored value:", updatedValue.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

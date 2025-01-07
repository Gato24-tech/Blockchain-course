const { ethers } = require("ethers");
const fs = require("fs");

// Dirección del contrato y ABI
const deployments = JSON.parse(fs.readFileSync("./deployments.json", "utf8"));
const contractAddress = deployments.contractAddress;
const contractABI = JSON.parse(fs.readFileSync("./artifacts/contracts/AdvancedContract.sol/AdvancedContract.json", "utf8")).abi;

async function main() {
    // Configuración del proveedor y signer
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
    const wallet = new ethers.Wallet("PRIVATE_KEY_HERE", provider); // Reemplaza PRIVATE_KEY_HERE con una clave privada válida

    // Instanciación del contrato
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    // Ejemplo de interacción
    console.log("Llamando a una función del contrato...");

    // Llamada a una función de lectura (view)
    const value = await contract.getValue(); // Reemplaza getValue con la función de tu contrato
    console.log("Valor recuperado del contrato:", value);

    // Llamada a una función de escritura
    const tx = await contract.setValue("Nuevo valor"); // Reemplaza setValue con una función válida
    await tx.wait();
    console.log("Transacción completada:", tx.hash);
}

main().catch((error) => {
    console.error("Error al interactuar con el contrato:", error);
});

import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import process from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const deploymentsPath = path.join(__dirname, "../../frontend/public/deployments.json");

async function main() {
    // Conectar al nodo local
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    
    // Verificar que deployments.json existe
    if (!fs.existsSync(deploymentsPath)) {
        console.error("Error: No se encontró deployments.json.");
        process.exit(1);
    }

    // Leer dirección y ABI desde deployments.json
    const deployments = JSON.parse(fs.readFileSync(deploymentsPath, "utf-8"));

    if (!deployments.localhost || !deployments.localhost.address || !deployments.localhost.abi) {
        console.error("Error: No se encontró la dirección o el ABI en deployments.json.");
        process.exit(1);
    }

    const contractAddress = deployments.localhost.address;
    const contractABI = deployments.localhost.abi;

    // Obtener el signer
    const signer = await provider.getSigner();

    // Conectar con el contrato
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Llamar a la función setValue con un nuevo valor
    const newValue = 42; // Puedes cambiar este valor
    console.log(`Enviando transacción para establecer el valor a: ${newValue}`);

    const tx = await contract.setValue(newValue);
    console.log("Transacción enviada:", tx.hash);

    // Esperar confirmación de la transacción
    const receipt = await tx.wait();
    console.log("Transacción confirmada en el bloque:", receipt.blockNumber);
}

main().catch((error) => {
    console.error("Error:", error);
    process.exit(1);
});

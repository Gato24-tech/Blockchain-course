import { ethers } from "ethers";
import fs from "fs";
import process from "process";
import path from "path";
import { fileURLToPath } from "url";

async function main() {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

    // Definir __dirname
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Cargar deployments.json para obtener la dirección y ABI del contrato
       const deploymentsPath = path.join(__dirname, "../../frontend/public/deployments.json");
    
    if (!fs.existsSync(deploymentsPath)) {
        console.error("Error: No se encontró deployments.json.");
        process.exit(1);
    }

    const deployments = JSON.parse(fs.readFileSync(deploymentsPath, "utf-8"));

    if (!deployments.contractAddress || !deployments.abi) {
        console.error("Error: No se encontró la dirección o el ABI en deployments.json.");
        process.exit(1);
    }

    // Crear la instancia del contrato
    const contract = new ethers.Contract(deployments.contractAddress, deployments.abi, provider);

    // Llamar a la función del contrato
    const value = await contract.getValue();
    console.log("El valor almacenado es:", value.toString());
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

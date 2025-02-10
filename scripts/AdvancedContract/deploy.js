import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import process from "process";


// Definir __dirname en ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    const deploymentsPath = path.join(__dirname, "deployments.json");
    const frontendDir = path.join(__dirname, "frontend/public"); // ⬅️ Declaramos frontendDir correctamente

    // Verifica si el directorio frontend/public existe, si no, lo crea
    if (!fs.existsSync(frontendDir)) {
        fs.mkdirSync(frontendDir, { recursive: true });
    }

    const frontendPath = path.join(frontendDir, "deployments.json");
    
    // Copia el archivo de deployments.json
    fs.copyFileSync(deploymentsPath, frontendPath);
    console.log("Deployment address copied to frontend/public/deployments.json");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

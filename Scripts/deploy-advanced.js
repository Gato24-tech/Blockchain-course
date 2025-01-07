const fs = require("fs"); // Importa el módulo para escribir archivos

async function main() {
    // Desplegar el contrato
    const AdvancedContract = await ethers.deployContract("AdvancedContract");
    await AdvancedContract.waitForDeployment();

    // Obtener dirección del contrato y número de bloque
    const deploymentData = {
        address: await AdvancedContract.getAddress(), // Dirección del contrato
        blockNumber: (await AdvancedContract.deploymentTransaction()).blockNumber, // Bloque donde se desplegó
    };

    // Guardar los datos en el archivo deployments.json
    const filePath = "deployments.json"; // Ruta del archivo (en la raíz del proyecto)
    fs.writeFileSync(filePath, JSON.stringify(deploymentData, null, 2)); // Escribe el JSON con formato legible

    // Mensaje de éxito
    console.log("AdvancedContract deployed to:", deploymentData.address);
    console.log("Deployment data saved to:", filePath);
}

// Ejecutar el script y manejar errores
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

const fs = require("fs");
const hre = require("hardhat"); // Importar Hardhat Runtime Environment

async function main() {
    const AdvancedContract = await ethers.deployContract("AdvancedContract");
    await AdvancedContract.waitForDeployment();

    const network = hre.network.name; // Obtener la red actual
    const deploymentData = {
        address: await AdvancedContract.getAddress(),
        blockNumber: (await AdvancedContract.deploymentTransaction()).blockNumber,
    };

    // Leer datos existentes si el archivo ya existe
    let deployments = {};
    const filePath = "deployments.json";
    if (fs.existsSync(filePath)) {
        deployments = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }

    // Actualizar datos para la red actual
    deployments[network] = deploymentData;
    fs.writeFileSync(filePath, JSON.stringify(deployments, null, 2));

    console.log("AdvancedContract deployed to:", deploymentData.address);
    console.log("Deployment data saved to:", filePath);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Obtener la fábrica del contrato
    const AdvancedContract = await ethers.getContractFactory("AdvancedContract");

    console.log("Deploying AdvancedContract...");

    // Desplegar el contrato
    const advancedContract = await AdvancedContract.deploy();

    // Esperar a que se complete el despliegue
    await advancedContract.waitForDeployment();

    // Obtener la dirección del contrato desplegado
    const contractAddress = await advancedContract.getAddress();
    console.log("AdvancedContract deployed at:", contractAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

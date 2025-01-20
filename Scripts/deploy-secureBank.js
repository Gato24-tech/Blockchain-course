const hre = require("hardhat");

async function main() {
    // Obtener el contrato SecureBank
    const SecureBank = await hre.ethers.getContractFactory("SecureBank");

    console.log("Desplegando el contrato SecureBank...");

    // Desplegar el contrato
    const secureBank = await SecureBank.deploy();

    // Esperar a que se complete el despliegue
    await secureBank.deployed();

    console.log(`SecureBank desplegado en la dirección: ${secureBank.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

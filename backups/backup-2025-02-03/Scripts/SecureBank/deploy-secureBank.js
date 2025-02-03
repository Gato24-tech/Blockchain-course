const hre = require("hardhat");
const fs = require("fs");

async function main() {
    const SecureBank = await hre.ethers.getContractFactory("SecureBank");
    console.log("Desplegando el contrato SecureBank...");

    const secureBank = await SecureBank.deploy();
    await secureBank.waitForDeployment();

    const contractAddress = await secureBank.getAddress();
    console.log(`SecureBank desplegado en la dirección: ${contractAddress}`);

    // Guardar la dirección en deployments.json
    const deployments = {
        localhost: {
            address: contractAddress,
        },
    };

    fs.writeFileSync("deployments.json", JSON.stringify(deployments, null, 2));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

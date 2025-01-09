const { ethers } = require("hardhat");

async function main() {
    const deployments = require('../deployments.json');
    const contractAddress = deployments.address;

    const AdvancedContract = await ethers.getContractFactory("AdvancedContract");
    const contract = AdvancedContract.attach(contractAddress);

    // Obtener el valor inicial
    let value = await contract.getValue();
    console.log(`Valor inicial almacenado: ${value}`);

    // Actualizar el valor
    await contract.setValue(42);
    console.log(`Nuevo valor almacenado: 42`);

    // Incrementar el valor
    await contract.incrementValue(10);
    value = await contract.getValue();
    console.log(`Valor después de incrementar: ${value}`);

    // Obtener el historial de valores
    const history = await contract.getValueHistory();
    console.log(`Historial de valores: ${history}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

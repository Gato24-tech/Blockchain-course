const { ethers } = require("hardhat");

async function main() {
    const deployments = require('../deployments.json');
    const contractAddress = deployments.localhost.address;

    const [owner, unauthorized] = await ethers.getSigners();
    const AdvancedContract = await ethers.getContractFactory("AdvancedContract");
    const contract = AdvancedContract.attach(contractAddress);

    console.log(`Interaccionando con el contrato en: ${contractAddress}`);

    try {
        // Obtener el valor inicial
        let value = await contract.getValue();
        console.log(`Valor inicial almacenado: ${value}`);

        // Actualizar el valor dentro del límite
        await contract.connect(owner).setValue(42);
        console.log(`Nuevo valor almacenado: 42`);

        // Probar valor fuera del límite
        try {
            await contract.connect(owner).setValue(2000);
        } catch (error) {
            console.error("Error esperado al intentar establecer un valor fuera del límite:", error.message);
        }

        // Incrementar el valor dentro del límite
        await contract.connect(owner).incrementValue(10);
        value = await contract.getValue();
        console.log(`Valor después de incrementar: ${value}`);

        // Probar incremento fuera del límite
        try {
            await contract.connect(owner).incrementValue(1000);
        } catch (error) {
            console.error("Error esperado al intentar incrementar fuera del límite:", error.message);
        }

        // Intentar actualizar desde una cuenta no autorizada
        try {
            await contract.connect(unauthorized).incrementValue(2000);
        } catch (error) {
            console.error("Error esperado al intentar actualizar desde una cuenta no autorizada:", error.message);
        }

        // Obtener el historial de valores
        const history = await contract.getValueHistory();
        console.log(`Historial de valores: ${history}`);
    } catch (error) {
        console.error("Error en el script principal:", error);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

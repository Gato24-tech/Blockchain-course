const { ethers } = require("hardhat");

async function main() {
    const deployments = require('../../deployments.json'); // Dirección del contrato desplegado
    const contractAddress = deployments.localhost.address;

    const [owner, unauthorized] = await ethers.getSigners();
    const AdvancedContract = await ethers.getContractFactory("AdvancedContract");
    const contract = AdvancedContract.attach(contractAddress);

    console.log(`Interacting with the contract at: ${contractAddress}`);

    try {
        // 1. Obtener el valor inicial
        let value = await contract.getValue();
        console.log(`Initial stored value: ${value}`);

        // 2. Actualizar el valor dentro del límite
        await contract.connect(owner).setValue(42);
        console.log(`Value updated to: 42`);

        // 3. Probar establecer un valor fuera del límite
        try {
            await contract.connect(owner).setValue(2000);
        } catch (error) {
            console.error("Expected error when setting value outside the limit:", error.message);
        }

        // 4. Incrementar el valor dentro del límite
        await contract.connect(owner).incrementValue(10);
        value = await contract.getValue();
        console.log(`Value after increment: ${value}`);

        // 5. Probar incrementar fuera del límite
        try {
            await contract.connect(owner).incrementValue(1000);
        } catch (error) {
            console.error("Expected error when incrementing outside the limit:", error.message);
        }

        // 6. Intentar actualizar desde una cuenta no autorizada
        try {
            await contract.connect(unauthorized).setValue(20);
        } catch (error) {
            console.error("Expected error when updating from an unauthorized account:", error.message);
        }

        // 7. Obtener el historial de valores
        const history = await contract.getValueHistory();
        console.log(`Value history: ${history.map((val) => val.toString()).join(", ")}`);
    } catch (error) {
        console.error("Error in the main script:", error);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

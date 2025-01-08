// scripts/interact-advanced.js
const { ethers } = require("hardhat");

async function main() {
    const AdvancedContract = await ethers.getContractAt("AdvancedContract", "0x5FbDB2315678afecb367f032d93F642f64180aa3");
    await AdvancedContract.getValue(); // Debería devolver un valor predeterminado si está funcionando correctamente.
    

    // Llamada a la función getValue (debería devolver 0 inicialmente)
    const initialValue = await AdvancedContract.getValue();
    console.log("Valor inicial almacenado:", initialValue.toString());

    // Configurar un nuevo valor
    const tx = await AdvancedContract.setValue(42);
    await tx.wait(); // Esperar la confirmación de la transacción
    console.log("Se configuró un nuevo valor: 42");

    // Verificar el nuevo valor almacenado
    const newValue = await AdvancedContract.getValue();
    console.log("Nuevo valor almacenado:", newValue.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

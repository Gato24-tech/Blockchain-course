const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    // Cargar la dirección del contrato
    const deploymentsPath = path.join(__dirname, "../../deployments.json");
    const deployments = JSON.parse(fs.readFileSync(deploymentsPath, "utf-8"));
    const contractAddress = deployments.localhost.address;

    const [owner] = await ethers.getSigners();
    const SecureBank = await ethers.getContractFactory("SecureBank");
    const contract = SecureBank.attach(contractAddress);

    console.log(`Interacting with the contract at: ${contractAddress}`);

    try {
        // Obtener el balance inicial
        let balance = await contract.getBalance(owner.address);

        // Validar el valor de balance
        console.log(`Valor devuelto por getBalance (antes de conversión):`, balance);

        // Convertir a BigNumber si es necesario
        if (typeof balance === "bigint") {
            balance = ethers.BigNumber.from(balance.toString());
        }

        console.log(`Balance como BigNumber: ${balance.toString()}`);
        console.log(`Balance en ETH: ${ethers.utils.formatEther(balance)} ETH`);

        // Depositar ETH
        const depositAmount = ethers.utils.parseEther("1.0");
        const depositTx = await contract.connect(owner).deposit({ value: depositAmount });
        await depositTx.wait();
        console.log(`Deposited ${ethers.utils.formatEther(depositAmount)} ETH`);

        // Consultar balance después del depósito
        balance = await contract.getBalance(owner.address);

        // Convertir nuevamente a BigNumber si es necesario
        if (typeof balance === "bigint") {
            balance = ethers.BigNumber.from(balance.toString());
        }

        console.log(`Balance después del depósito en ETH: ${ethers.utils.formatEther(balance)} ETH`);
    } catch (error) {
        console.error("Error in the main script:", error);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

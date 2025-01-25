const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    // Cargar la dirección del contrato
    const deployments = JSON.parse(fs.readFileSync("./deployments.json", "utf-8"));
    const contractAddress = deployments.localhost.address;

    const [owner, unauthorized] = await ethers.getSigners();
    const SecureBank = await ethers.getContractFactory("SecureBank");
    const contract = SecureBank.attach(contractAddress);

    console.log(`Interacting with the contract at: ${contractAddress}`);

    try {
        // 1. Obtener el balance inicial
        let balance = await contract.getBalance(owner.address);
        balance = ethers.BigNumber.from(balance || "0"); // Asegurarse de manejar null o undefined
        console.log(`Raw balance: ${balance.toString()}`);
        console.log(`Formatted balance: ${ethers.utils.formatEther(balance)} ETH`);

        // 2. Depositar ETH
        const depositAmount = ethers.utils.parseEther("1.0");
        await contract.connect(owner).deposit({ value: depositAmount });
        console.log(`Deposited ${ethers.utils.formatEther(depositAmount)} ETH`);

        // 3. Consultar balance después del depósito
        balance = await contract.getBalance(owner.address);
        console.log(`Balance después del depósito: ${ethers.utils.formatEther(balance)} ETH`);
    } catch (error) {
        console.error("Error in the main script:", error);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

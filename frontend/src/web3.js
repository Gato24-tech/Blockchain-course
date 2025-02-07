import { ethers } from "ethers";

async function _getDeployments() {  
  try {
  const response = await fetch(`/deployments.json`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
}
return await response.json(); 
} catch (error) {
  console.error("Error obtenido deployments:",error);
  return null; 
}
}

const connectWallet = async () => {
  if (!window.ethereum) {
    alert("MetaMask no está instalado");
    return null;
  }

  try {
    // Solicitar acceso a MetaMask
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const account = await signer.getAddress();

    console.log("Cuenta conectada:", account);
    return { provider, signer, account };
  } catch (error) {
    console.error("Error conectando con MetaMask:", error);
    return null;
  }
};

const getContract = async () => {
  const { provider, signer } = await connectWallet();
  if (!provider || !signer) return null;

const deployments = await _getDeployments();
if (!deployments || !deployments.contractAddress || !deployments.abi) {
  console.error("No se encontró la direccion o ABI del contrato en deployments.json");
  return null;
}

const contract = new ethers.Contract(deployments.contractAddress, deployments.abi, signer);
console.log("Contrato conectado:", contract);
return contract;
};

export { connectWallet, getContract };

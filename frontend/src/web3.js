import { ethers } from "ethers";
import deployments from "../deployments.json"; 

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

  const contractAddress = deployments.contractAddress; // Verifica la clave correcta en deployments.json
  const contractABI = deployments.abi; // Verifica la clave correcta en deployments.json

  if (!contractAddress || !contractABI) {
    console.error("No se encontró la dirección o ABI del contrato en deployments.json");
    return null;
  }

  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  console.log("Contrato conectado:", contract);
  return contract;
};

export { connectWallet, getContract };

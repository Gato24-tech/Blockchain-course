import { useState } from "react";
import { connectWallet, getContract } from "./src/web3";


function App() {
  const [account, setAccount] = useState(null);

  const handleConnect = async () => {
    const wallet = await connectWallet();
    if (wallet) setAccount(wallet.account);
  };

  return (
    <div>
      <h1>Vite + React + Blockchain</h1>
      <button onClick={handleConnect}>
        {account ? `Conectado: ${account}` : "Conectar Wallet"}
      </button>
    </div>
  );
}

export default App;

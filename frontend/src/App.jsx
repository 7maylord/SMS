import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./abi.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";  

const CONTRACT_ADDRESS = "0x72adE6a1780220074Fd19870210706AbCb7589BF";

function App() {
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  
  // Function to shorten the wallet address (e.g., 0x1234...5678)
  function shortenAddress(address) {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
  }

  // Check if wallet is already connected
  useEffect(() => {
    async function checkWalletConnection() {
      if (typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setIsConnected(true);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    }
    checkWalletConnection();
  }, []);

  // Request accounts function
  async function requestAccounts() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        toast.success("Wallet connected successfully!");
      } catch (err) {
        toast.error(`Wallet connection failed: ${err.message}`);
      }
    } else {
      toast.warn("Please add wallet to use this app.");
    }
  }

  // Disconnect Wallet function
  function disconnectWallet() {
    setWalletAddress(null);
    setIsConnected(false);
    toast.info("Wallet disconnected.");
  }

  async function getContract(signer = false) {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      return signer
        ? new ethers.Contract(CONTRACT_ADDRESS, abi, await provider.getSigner())
        : new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
    } else {
      toast.error("Ethereum provider is not available.");
      return null;
    }
  }

  async function registerStudent() {
    try {
      const contract = await getContract(true);
      const tx = await contract.registerStudent(studentId, studentName);
      await tx.wait();
      setStudentId("");
      setStudentName("");
      toast.success("Student registered successfully!");
    } catch (err) {
      toast.error(`Registration failed: ${err.message}`);
    }
  }

  async function removeStudent() {
    try {
      const contract = await getContract(true);
      const tx = await contract.removeStudent(studentId);
      await tx.wait();
      setStudentId("");
      toast.success("Student removed successfully!");
    } catch (err) {
      toast.error(`Removal failed: ${err.message}`);
    }
  }

  return (
    <div className="dapp-container">
      <h1>School Management DApp</h1>
      {isConnected ? (
        <div>
          <p><strong>Connected Wallet:</strong> {shortenAddress(walletAddress)}</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
      ) : (
        <button onClick={requestAccounts}>Connect Wallet</button>
      )}
      <div className="form-section">
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <button onClick={registerStudent}>Register Student</button>
        <button onClick={removeStudent}>Remove Student</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;

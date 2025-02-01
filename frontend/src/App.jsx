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
  const [students, setStudents] = useState([]);
  const [studentDetails, setStudentDetails] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showAllStudentsModal, setShowAllStudentsModal] = useState(false);

  function shortenAddress(address) {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
  }

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

  async function getStudentById() {
    try {
      const contract = await getContract();
      const name = await contract.getStudentById(studentId);
      setStudentDetails({ id: studentId, name });
      setShowStudentModal(true);
    } catch (err) {
      toast.error(`Error fetching student: ${err.message}`);
    }
  }

  async function getAllStudents() {
    try {
      const contract = await getContract();
      const studentList = await contract.getAllStudents();
      setStudents(studentList);
      setShowAllStudentsModal(true);
    } catch (err) {
      toast.error(`Error fetching students: ${err.message}`);
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
        <input type="text" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
        <input type="text" placeholder="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
        <button onClick={registerStudent}>Register Student</button>
        <button onClick={removeStudent}>Remove Student</button>
        <button onClick={getStudentById}>Get Student by ID</button>
        <button onClick={getAllStudents}>Get All Students</button>
      </div>
      
      {showStudentModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Student Details</h2>
            <p><strong>ID:</strong> {studentDetails?.id}</p>
            <p><strong>Name:</strong> {studentDetails?.name}</p>
            <button onClick={() => setShowStudentModal(false)}>Close</button>
          </div>
        </div>
      )}

      {showAllStudentsModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>All Students</h2>
            {students.length > 0 ? (
              students.map((student, index) => (
                <p key={index}><strong>ID:</strong> {student.id} | <strong>Name:</strong> {student.name}</p>
              ))
            ) : (
              <p>No students found.</p>
            )}
            <button onClick={() => setShowAllStudentsModal(false)}>Close</button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default App;

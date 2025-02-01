# School Management DApp

## Overview
The **School Management DApp** is a decentralized application built using React and Ethers.js, allowing users to manage student records on the blockchain. Users can register students, remove students, retrieve student details by ID, and view all registered students. The application interacts with a deployed smart contract on the Sepolia testnet.

## Features
- **Connect & Disconnect Wallet**: Users can connect their Ethereum wallet to interact with the smart contract.
- **Register Student**: Adds a student to the blockchain with a unique ID and name.
- **Remove Student**: Removes a student from the blockchain using their ID.
- **Retrieve Student by ID**: Fetches details of a student based on their ID.
- **Get All Students**: Displays a list of all registered students.
- **Modals for Displaying Data**: Uses modals to display student details and all students in a user-friendly manner.
- **Toast Notifications**: Provides feedback to users on their actions.

## Technologies Used
- **React**: Frontend framework
- **Ethers.js**: Blockchain interaction
- **React-Toastify**: Notifications
- **Solidity**: Smart contract development
- **Hardhat**: Deployment and testing framework

## Installation & Setup

### Prerequisites
- Node.js installed
- MetaMask browser extension

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/7maylord/SMS
   cd sms
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Connect your wallet(MetaMask) to the Sepolia testnet and interact with the DApp.

## Smart Contract Details
- **Network**: Sepolia Testnet
- **Contract Address**: `0x72adE6a1780220074Fd19870210706AbCb7589BF`
- **ABI**: Located in `abi.json`

## Usage Guide
1. **Connect Wallet**: Click the "Connect Wallet" button to enable blockchain interactions.
2. **Register a Student**: Enter a unique Student ID and Name, then click "Register Student".
3. **Remove a Student**: Provide the Student ID and click "Remove Student".
4. **Fetch Student by ID**: Enter a Student ID and click "Get Student by ID".
5. **View All Students**: Click "Get All Students" to display a list of all registered students.
6. **Disconnect Wallet**: Click "Disconnect" to disconnect your wallet.

## License
This project is licensed under the MIT License.


// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const SchoolManagementSystemModule = buildModule("SchoolManagementSystemModule", (m) => {
  
  const sms = m.contract("SchoolManagementSystem");

  return { sms };
});

export default SchoolManagementSystemModule;

import pkg from 'hardhat';
const { ethers } = pkg;

async function main() {
    // Get the ContractFactory
    const EtherBallot = await ethers.getContractFactory("etherballot");
  
    // Deploy the contract
    const etherBallot = await EtherBallot.deploy();
  
    await etherBallot.deployed();
  
    // Retrieve and log the contract address
    console.log("EtherBallot deployed to:", await etherBallot.address);
  }
  
  // Call main function
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  
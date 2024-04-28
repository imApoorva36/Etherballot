import pkg from 'hardhat';
const { ethers } = pkg;

async function main() {
  // Get the ContractFactory
  const EtherBallot = await ethers.getContractFactory("EtherBallot");

  // Deploy the contract
  const etherBallot = await EtherBallot.deploy(
    ["Candidate1", "Candidate2"], // Array of candidate names
    Math.floor(Date.now() / 1000), // Start time (current timestamp)
    Math.floor(Date.now() / 1000) + 3600 // Stop time (1 hour from now)
  );

  await etherBallot.waitForDeployment();

  console.log("EtherBallot deployed to:", etherBallot.address);
}

// Run the deployment
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

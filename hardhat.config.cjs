require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",

  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/211d33088379493099b6176b89cb0c7b",
      accounts: ["0xd557d868c971c3f5e5f6c0710b50f56c60212cc83be3cdcd7e7f76e09f549311"],
    },
  },
};

//d557d868c971c3f5e5f6c0710b50f56c60212cc83be3cdcd7e7f76e09f549311

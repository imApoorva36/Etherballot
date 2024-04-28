const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("EtherBallot", function () {
  let EtherBallot;
  let etherBallot;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    EtherBallot = await ethers.getContractFactory("EtherBallot");
    etherBallot = await EtherBallot.deploy(["Candidate1", "Candidate2"], Math.floor(Date.now() / 1000), Math.floor(Date.now() / 1000) + 3600);
    await etherBallot.waitForDeployment();
  });

  it("Should deploy and initialize EtherBallot", async function () {
    expect(await etherBallot.getCandidateCount()).to.equal(2);
  });

  it("Should allow voting and increase vote count", async function () {
    await etherBallot.connect(addr1).vote("Voter1", "Candidate1", { value: ethers.parseEther("1") });
    const candidate1Votes = await etherBallot.getCandidate(0);
    expect(candidate1Votes[1]).to.equal(1);
  });

  it("Should prevent voting outside the specified time", async function () {
    const pastTime = Math.floor(Date.now() / 1000) - 3600;
    etherBallot = await EtherBallot.deploy(["Candidate1", "Candidate2"], pastTime, pastTime + 3600);
    await etherBallot.waitForDeployment();

    await expect(etherBallot.connect(addr1).vote("Voter1", "Candidate1", { value: ethers.parseEther("1") }))
      .to.be.revertedWith("Voting is not allowed at this time.");
  });

  it("Should prevent multiple votes from the same address", async function () {
    await etherBallot.connect(addr1).vote("Voter1", "Candidate1", { value: ethers.parseEther("1") });
    await expect(etherBallot.connect(addr1).vote("Voter2", "Candidate2", { value: ethers.parseEther("1") }))
      .to.be.revertedWith("You have already voted.");
  });
});

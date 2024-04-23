// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.3;

contract EtherBallot {
    uint public voteCountTotal = 0;

    struct Voter {
        string voterName;
        string candidate;
        uint timestamp;
        bool voted;
    }

    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(address => Voter) public voters;
    address payable public electionComm;
    Candidate[] public candidates;

    event VoteCast(string indexed voterName, string indexed candidateName);

    constructor(string[] memory _candidateNames) {
        electionComm = payable(msg.sender);

        for (uint i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate({
                name: _candidateNames[i],
                voteCount: 0
            }));
        }
    }

    function vote(string calldata _voterName, string calldata _candidate) external payable {
        require(msg.value > 0, "Please send more than 0 ether.");
        require(voters[msg.sender].voted == false, "You have already voted.");

        bool candidateExists = false;
        for (uint i = 0; i < candidates.length; i++) {
            if (keccak256(bytes(candidates[i].name)) == keccak256(bytes(_candidate))) {
                candidateExists = true;
                candidates[i].voteCount++;
                break;
            }
        }
        require(candidateExists, "Candidate does not exist.");

        voters[msg.sender] = Voter({
            voterName: _voterName,
            candidate: _candidate,
            timestamp: block.timestamp,
            voted: true
        });

        voteCountTotal++;
        emit VoteCast(_voterName, _candidate);
    }

    function getCandidateCount() external view returns (uint) {
        return candidates.length;
    }

    function getCandidate(uint index) external view returns (string memory, uint) {
        require(index < candidates.length, "Invalid candidate index.");
        return (candidates[index].name, candidates[index].voteCount);
    }
}

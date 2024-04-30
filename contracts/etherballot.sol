// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract etherballot {

    address public owner;               //address of the owner of the contract
    uint256 public electionCounter;     //election ID which increments by 1 whenever new election is created

    struct Candidate {                  //Candidate details
        string name;
        uint256 voteCount;
    }

    struct Voter {                      //Voter details
        string name;
        uint256 votedAt;
        bool hasVoted;
    }

    struct ElectionInstance {           //Election details
        uint256 id;
        uint256 startTime;
        uint256 stopTime;
        Candidate[] candidates;
        mapping(address => bool) voters;
        mapping(address => Voter) voterDetails;
    }

    mapping(uint256 => ElectionInstance) public elections;      //Mapping of all elections

    address[] public uniqueVoters;         //Array of all the voters(address) on the platform

    event ElectionCreated(uint256 indexed id, uint256 startTime, uint256 stopTime);
    event VoteCast(uint256 indexed electionId, address indexed voter, uint256 candidateIndex);
    event VoterAdded(address indexed voter);

    //Allows only owner to create elections
    modifier onlyOwner() {                  
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
        electionCounter = 0;
    }

    //Creating new elections
    function createElection(uint256 _startTime, uint256 _stopTime, string[] memory _candidates) external onlyOwner {
        require(_startTime < _stopTime, "Start time must be before stop time");

        ElectionInstance storage newElection = elections[electionCounter];

        newElection.id = electionCounter;
        newElection.startTime = _startTime;
        newElection.stopTime = _stopTime;

        for (uint256 i = 0; i < _candidates.length; i++) {
            newElection.candidates.push(Candidate({name: _candidates[i], voteCount: 0}));
        }

        emit ElectionCreated(electionCounter, _startTime, _stopTime);
        electionCounter++;
    }

    //Checking whether voter is registered on platform
    function isVoter(address _voter) internal view returns (bool) {
        for (uint256 i = 0; i < uniqueVoters.length; i++) {
            if (uniqueVoters[i] == _voter) {
                return true;
            }
        }
        return false;
    }

    //Adding voters to array of registered voters
    function addToUniqueVoters(address _voter) external onlyOwner {
        require(!isVoter(_voter), "Voter already present in the unique voters list");
        uniqueVoters.push(_voter);
        emit VoterAdded(_voter);
    }

    //Voting function
    function vote(uint256 _electionId, string memory _voterName, uint256 _candidateIndex) external payable {
        require(isVoter(msg.sender), "You are not allowed to vote");    
        require(block.timestamp >= elections[_electionId].startTime && block.timestamp <= elections[_electionId].stopTime, "Voting is not allowed at this time");
        require(!elections[_electionId].voters[msg.sender], "You have already voted in this election");

        elections[_electionId].voters[msg.sender] = true;
        elections[_electionId].candidates[_candidateIndex].voteCount++;

        Voter memory newVoter = Voter({name: _voterName, votedAt: block.timestamp, hasVoted: true});
        elections[_electionId].voterDetails[msg.sender] = newVoter;

        emit VoteCast(_electionId, msg.sender, _candidateIndex);
    }
}

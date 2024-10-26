// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract dVoting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public hasVoted;

    uint public candidatesCount;

    constructor() {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
        addCandidate("Candidate 3");
        addCandidate("Candidate 4");
        addCandidate("Candidate 5");
    }

    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _candidateId) public {
        require(!hasVoted[msg.sender], "Already voted.");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate.");
        
        candidates[_candidateId].voteCount++;
        hasVoted[msg.sender] = true;
    }

    function getVotes(uint _candidateId) public view returns (uint) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate.");
        return candidates[_candidateId].voteCount;
    }
}

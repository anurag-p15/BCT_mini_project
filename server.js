// Load environment variables
require("dotenv").config();

const express = require("express");
const { Web3 } = require("web3");

const app = express();
const PORT = 3000;

// Initialize Web3 instance with HTTP provider
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
const contractAddress = process.env.CONTRACT_ADDRESS;
console.log("Contract Address: ", process.env.CONTRACT_ADDRESS); // Debugging line

const contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "candidatesCount",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_candidateId", "type": "uint256" }],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_candidateId", "type": "uint256" }],
        "name": "getVotes",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    }
];

const dVotingContract = new web3.eth.Contract(contractABI, contractAddress);

// API endpoint to get candidates
app.get("/candidates", async (req, res) => {
    try {
        const candidates = [];
        
        // Fetch the total number of candidates
        const candidatesCount = await dVotingContract.methods.candidatesCount().call();
        console.log(`Candidates count: ${candidatesCount}`); // Debug log
        
        // Iterate through all candidates to fetch their details
        for (let i = 1; i <= candidatesCount; i++) {
            console.log("Fetching candidate with ID:", i);

            // Fetching candidate details directly
            const candidate = await dVotingContract.methods.candidates(i).call();
            const votes = await dVotingContract.methods.getVotes(i).call();

            // Push candidate details into the array
            candidates.push({
                id: candidate.id,
                name: candidate.name,
                voteCount: votes
            });
        }

        res.json(candidates);
    } catch (error) {
        console.error('Error fetching candidates:', error);
        res.status(500).json({ message: 'Failed to fetch candidates', error: error.toString() });
    }
});


// API endpoint to vote
app.post("/vote/:candidateId", async (req, res) => {
    try {
        const accounts = await web3.eth.getAccounts();
        const receipt = await dVotingContract.methods.vote(req.params.candidateId)
            .send({ from: accounts[0] });
        res.send(receipt);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
app.use(express.static('public'));



const { ethers } = require("hardhat");

async function main() {
    const DVoting = await ethers.getContractFactory("dVoting");
    const dVoting = await DVoting.deploy(); // Deploy contract

    console.log("Deploying contract...");
    await dVoting.deployTransaction.wait(); // Wait for the deployment transaction to be mined

    console.log("dVoting contract deployed to:", dVoting.address); // Log the deployed address
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

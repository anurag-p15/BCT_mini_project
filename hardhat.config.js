require("@nomicfoundation/hardhat-toolbox");

module.exports = {
    solidity: {
        version: "0.8.27",  // Set to 0.8.27 to match your contract
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545"
        }
    }
};

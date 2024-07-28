const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const dataDir = "./data";
const genesisFilePath = path.join(__dirname, "../config/genesis.json");

// validate data directory
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize Ethereum node
exec(
  `geth --datadir ${dataDir} init ${genesisFilePath}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error initializing node: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error initializing node: ${stderr}`);
      return;
    }
    console.log(`Node initialized: ${stdout}`);

    // Start the Ethereum node
    exec(
      `geth --datadir ${dataDir} --networkid 1234 --http --http.addr "0.0.0.0" --http.port 8545 --port 30303 --nodiscover console`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error starting node: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Error starting node: ${stderr}`);
          return;
        }
        console.log(`Node started: ${stdout}`);
      }
    );
  }
);

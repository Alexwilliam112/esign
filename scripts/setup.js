const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const dataDir = "./data";
const genesisFilePath = path.join(__dirname, "./genesis.json");
const startScriptPath = path.join(__dirname, "start-geth.sh");

// Validate data directory
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Function to execute shell commands
function executeCommand(command, description) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error during ${description}: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`Stderr during ${description}: ${stderr}`);
      }
      console.log(`Stdout during ${description}: ${stdout}`);
      resolve(stdout.trim());
    });
  });
}

// Initialize Ethereum node
executeCommand(
  `geth --datadir ${dataDir} init ${genesisFilePath}`,
  "node initialization"
)
  .then(() => {
    console.log("Node initialized successfully.");

    // Start the Ethereum node using PM2
    return executeCommand(
      `pm2 start ${startScriptPath} --name geth-node`,
      "starting node with PM2"
    );
  })
  .then(() => {
    console.log("Node started with PM2 successfully.");

    // Save PM2 process list
    return executeCommand("pm2 save", "saving PM2 process list");
  })
  .then(() => {
    console.log("PM2 process list saved.");

    // Set up PM2 to start on system startup
    return executeCommand("pm2 startup", "setting up PM2 startup");
  })
  .then((startupCommand) => {
    console.log("PM2 startup command obtained.");
    console.log(startupCommand);

    // Execute the startup command
    return executeCommand(startupCommand, "executing PM2 startup command");
  })
  .then(() => {
    console.log("PM2 startup command executed successfully.");
  })
  .catch((error) => {
    console.error("Setup failed:", error);
  });

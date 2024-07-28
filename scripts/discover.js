const Web3 = require('web3');
const exec = require('child_process').exec;

// Connect to Ethereum node
const web3 = new Web3('http://localhost:8545'); //! TODO REPLACE

async function discoverAndAddNodes() {
  try {
    const isListening = await web3.eth.net.isListening();
    if (!isListening) {
      console.log('Ethereum node is not listening. Ensure your node is running.');
      return;
    }

    const peers = [
      'enode://e527e756f07f48207605ffc7d91f02d310fa5f3e24efb1b49c0ecee35baf0abaf16b0b43994216d6ca0322e0dcabace7db426c3974a8c7e07285791f25f53284@34.50.70.22:30303',
    ];

    // Add each peer to the current node
    for (const enode of peers) {
      exec(`geth attach http://localhost:8545 --exec "admin.addPeer('${enode}')"`), (error, stdout, stderr) => {
        if (error) {
          console.error(`Error adding peer: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Error adding peer: ${stderr}`);
          return;
        }
        console.log(`Added peer: ${enode}`);
      };
    }
  } catch (error) {
    console.error('Error discovering or adding nodes:', error);
  }
}

discoverAndAddNodes();

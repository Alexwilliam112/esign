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
      'enode://<enode_address1>@<ip1>:<port1>',
      'enode://<enode_address2>@<ip2>:<port2>',
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

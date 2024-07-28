#!/bin/bash
geth --datadir /path/to/data --networkid 1234 --http --http.addr "0.0.0.0" --http.port 8545 --http.api "admin,eth,net,web3" --ws --ws.addr "0.0.0.0" --ws.port 8546 --ws.api "admin,eth,net,web3" --port 30303

# DATA SCHEMA

## Primary Node Setup

```
sudo apt update
sudo apt install -y curl software-properties-common
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo apt install redis-server
sudo apt install git
```

## Ethereum Network Setup

```
sudo apt-get update
sudo apt-get install -y software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install -y ethereum
```

## Process Manager Setup

```
sudo npm i -g pm2
chmod +x /home/alexwilliam/esign/start-geth.sh
pm2 start /home/alexwilliam/esign/start-geth.sh --name geth-node
pm2 startup
pm2 save
sudo systemctl restart pm2-root
```

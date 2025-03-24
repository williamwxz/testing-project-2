# Blockchain Message Store

A full-stack application that allows storing and retrieving messages on the blockchain, with a Node.js backend API.

## Prerequisites

- Node.js version 18.x or higher
- npm (Node Package Manager)

## Added Project Structure

```
├── contracts/          # Smart contract source files
├── server/            # Backend API server
├── test/             # Smart contract tests
└── scripts/          # Deployment scripts
```

## Environment Setup

1. Copy`server/config/config.env.example` to `.env` file in the root directory and add the following variables:

```env
# For local development
ETHEREUM_NETWORK=http://127.0.0.1:8545
PRIVATE_KEY=your_private_key_here
CONTRACT_ADDRESS=deployed_contract_address

# For Sepolia testnet
# ETHEREUM_NETWORK=https://ethereum-sepolia-rpc.publicnode.com
```

## Smart Contract Deployment

### Local Deployment (Hardhat Network)

1. Install dependencies:
```bash
npm install
```

2. Start local Hardhat node:
```bash
npx hardhat node
```

3. Deploy contract to local network:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Sepolia Testnet Deployment

1. Update `.env` file with Sepolia configuration:
```env
ETHEREUM_NETWORK=https://ethereum-sepolia-rpc.publicnode.com
PRIVATE_KEY=your_wallet_private_key
```

2. Deploy to Sepolia:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

3. Save the deployed contract address in your `.env` file:
```env
CONTRACT_ADDRESS=deployed_contract_address
```

## Running Tests

Run smart contract tests:
```bash
npx hardhat test
```

## Running the Server

```bash
npm run start
```

The server will run on http://localhost:4000

## API Endpoints

### Store Message
```bash
curl -X POST http://localhost:4000/api/store-message \
-H "Content-Type: application/json" \
-d '{"message": "Hello, Blockchain!"}'
```

### Retrieve Message
```bash
curl http://localhost:4000/api/retrieve-message
```

### Test Blockchain Connection
```bash
curl http://localhost:4000/api/blockchain-test
```

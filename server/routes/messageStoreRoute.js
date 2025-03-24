const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');
const contractABI = require('../config/contractABI.json');

let contract = null;
let walletAddress = null;

// Initialize blockchain connection
async function initializeBlockchain() {
    try {
        // Validate environment variables
        if (!process.env.ETHEREUM_NETWORK) {
            throw new Error('ETHEREUM_NETWORK environment variable is not set');
        }

        if (!process.env.PRIVATE_KEY) {
            throw new Error('PRIVATE_KEY environment variable is not set');
        }

        if (!process.env.CONTRACT_ADDRESS) {
            throw new Error('CONTRACT_ADDRESS environment variable is not set');
        }

        // Validate and format private key
        let privateKey = process.env.PRIVATE_KEY;
        if (privateKey.startsWith('0x')) {
            privateKey = privateKey.slice(2);
        }

        const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_NETWORK);
        const wallet = new ethers.Wallet(privateKey, provider);
        walletAddress = await wallet.getAddress();
        
        contract = new ethers.Contract(
            process.env.CONTRACT_ADDRESS,
            contractABI,
            wallet
        );

        return true;
    } catch (error) {
        return false;
    }
}

// Initialize blockchain connection
initializeBlockchain();

// Store message
router.post('/store-message', async (req, res) => {
    try {
        if (!contract) {
            throw new Error('Blockchain connection not initialized');
        }

        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const tx = await contract.storeMessage(message);
        await tx.wait();

        res.json({ 
            success: true, 
            message: 'Message stored successfully',
            transactionHash: tx.hash 
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to store message',
            details: error.message 
        });
    }
});

// Retrieve message
router.get('/retrieve-message', async (req, res) => {
    try {
        if (!contract) {
            throw new Error('Blockchain connection not initialized');
        }

        const message = await contract.retrieveMessage();
        res.json({ message });
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to retrieve message',
            details: error.message 
        });
    }
});

// Test route to verify the router is working
router.get('/blockchain-test', async (req, res) => {
    try {
        const contractOwner = await contract.owner();
        res.json({ 
            message: 'MessageStore route is working',
            blockchainInitialized: contract !== null,
            walletAddress,
            contractOwner,
            isOwner: walletAddress === contractOwner
        });
    } catch (error) {
        res.json({
            message: 'MessageStore route is working',
            blockchainInitialized: contract !== null,
            error: error.message
        });
    }
});

module.exports = router; 
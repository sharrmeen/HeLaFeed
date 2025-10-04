// src/contexts/Web3Context.js
import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import SocialFeedABI from "../ABI/SocialFeed.json";
export const Web3Context = createContext();

// Initialize contract 
const CONTRACT_ADDRESS = "0x8B41cdB3cA3D7A223D36592Eefb39e4d4B3bd4e4";
const contractABI = SocialFeedABI.abi;
export const Web3Provider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);

    const connectWallet = async () => {
        if (typeof window.ethereum !== "undefined") {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = signer.address;
                setAccount(address);
                setProvider(provider);

                const socialMediaContract = new ethers.Contract(
                    CONTRACT_ADDRESS,
                    contractABI,
                    signer
                );
                setContract(socialMediaContract);
            } catch (error) {
                console.error("Error connecting to MetaMask:", error);
            }
        } else {
            alert("Please install MetaMask to use this application");
        }
    };

    const disconnectWallet = () => {
        setAccount(null);
        setContract(null);
        setProvider(null);
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                } else {
                    disconnectWallet();
                }
            });
        }
    }, []);

    return (
        <Web3Context.Provider
            value={{ account, contract, provider, connectWallet, disconnectWallet }}
        >
            {children}
        </Web3Context.Provider>
    );
};
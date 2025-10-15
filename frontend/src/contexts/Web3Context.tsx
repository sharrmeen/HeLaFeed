import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import { toast } from 'sonner';
import contractABI from '@/ABI/SocialFeed.json';

const CONTRACT_ADDRESS = '0xf469481628F6181918DE53da1612E98D2205906d';

interface Web3ContextType {
  account: string | null;
  contract: ethers.Contract | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  isRegistered: boolean;
  username: string;
  connectWallet: () => Promise<void>;
  registerUser: (username: string, bio: string) => Promise<void>;
  checkUserRegistration: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [username, setUsername] = useState('');

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        toast.error('Please install MetaMask to use this app');
        return;
      }

      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await web3Provider.send('eth_requestAccounts', []);
      const userSigner = await web3Provider.getSigner();
      const userContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, userSigner);

      setProvider(web3Provider);
      setSigner(userSigner);
      setContract(userContract);
      setAccount(accounts[0]);

      toast.success('Wallet connected!');
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
    }
  };

  const checkUserRegistration = async () => {
    if (!contract || !account) return;

    try {
      const registered = await contract.isUserRegistered(account);
      setIsRegistered(registered);

      if (registered) {
        const userData = await contract.users(account);
        setUsername(userData.username);
      }
    } catch (error) {
      console.error('Error checking registration:', error);
    }
  };

  const registerUser = async (username: string, bio: string) => {
    if (!contract) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      toast.loading('Registering user...');
      const tx = await contract.createUser(username, bio);
      await tx.wait();
      
      toast.success('User registered successfully!');
      await checkUserRegistration();
    } catch (error: any) {
      console.error('Error registering user:', error);
      toast.error('Failed to register user');
    }
  };

  useEffect(() => {
    if (account && contract) {
      checkUserRegistration();
    }
  }, [account, contract]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          checkUserRegistration();
        } else {
          setAccount(null);
          setIsRegistered(false);
          setUsername('');
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, [contract]);

  return (
    <Web3Context.Provider
      value={{
        account,
        contract,
        provider,
        signer,
        isRegistered,
        username,
        connectWallet,
        registerUser,
        checkUserRegistration,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

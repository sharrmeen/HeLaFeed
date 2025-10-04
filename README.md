# HeLaFeed – Decentralized Social Media on HeLa Blockchain

## Overview
HeLaFeed is a decentralized social media platform built on the HeLa blockchain, a next-generation Layer-1 blockchain purpose-built to solve the limitations of legacy blockchains and power real-world adoption across both Web2 and Web3 sectors. HeLaFeed allows users to create posts, like, comment, and register profiles, all while maintaining privacy and ownership over their data. By integrating Web3 technologies, HeLaFeed ensures a censorship-resistant and transparent social experience.

## Features
- **User Registration:** Users can register with a unique username and bio.
- **Post Creation:** Share text-based posts with the community.
- **Likes & Comments:** Engage with posts through likes and comments.
- **Web3 Integration:** Connect using MetaMask for a seamless Web3 experience.
- **Responsive UI:** Built with React and Tailwind CSS for a modern interface.

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Blockchain:** HeLa Blockchain, Ethers.js
- **Smart Contracts:** Solidity
- **Deployment:** Vercel (Frontend), HeLa Testnet (Smart Contracts)

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (v18 or higher)
- MetaMask extension in your browser
- Hardhat (for smart contract deployment)

### Installation
```bash
# Clone the repository
git clone https://github.com/sharrmeen/HeLaFeed.git
cd HeLaFeed

# Install dependencies
npm install

# Run the frontend
npm start

# (Optional) Deploy smart contracts
npx hardhat run scripts/deploy.js --network <network>
```
## Usage

1. **Connect Wallet:** Click on "Connect MetaMask" to link your wallet.  
2. **Register:** Set up your profile by choosing a username and bio.  
3. **Create Posts:** Share your thoughts with the community.  
4. **Engage:** Like and comment on posts to interact with others.

## Folder Structure

HeLaFeed/
├─ src/
│  ├─ components/   # React components
│  ├─ contexts/     # Web3 context
│  ├─ assets/       # Images, logos
│  ├─ ABI/          # Smart contract ABI
│  └─ utils/        # Helper functions
├─ scripts/
│  └─ deploy.js     # Hardhat deployment script
└─ README.md

## Smart Contracts

- **SocialFeed.sol:** Manages user registrations, posts, likes, and comments.  
- **Deployment:** The contract is deployed using Hardhat scripts to the HeLa testnet.

## Contributing

Your contributions are welcome! To get started:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-xyz
   ```
3. Make your changes.
4. Commit your changes:
   ```bash
    git commit -am 'Add feature xyz'
   ```
5. Push to the branch
6. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

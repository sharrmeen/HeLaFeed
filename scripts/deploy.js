// scripts/deploy.js
import hre from "hardhat";

async function main() {
  // 1 million tokens, converted to wei
  const initialSupply = hre.ethers.parseEther("1000000");

  // Get contract factory
  const Token = await hre.ethers.getContractFactory("MyToken");

  // Deploy contract
  const token = await Token.deploy(initialSupply);

  // Wait for deployment to be mined
  await token.waitForDeployment();

  console.log("Token deployed to:", await token.getAddress());
}

// Run the main function and catch errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

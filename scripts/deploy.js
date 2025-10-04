// scripts/deploy.js
import hre from "hardhat";

async function main() {
  // Get the contract factory for SocialFeed
  const SocialFeed = await hre.ethers.getContractFactory("SocialFeed");

  // Deploy the contract
  const socialFeed = await SocialFeed.deploy();

  // Wait for deployment to be mined
  await socialFeed.waitForDeployment();

  console.log("SocialFeed deployed to:", await socialFeed.getAddress());
}

// Run the main function and catch errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

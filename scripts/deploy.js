async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  const MessageStore = await ethers.getContractFactory("MessageStore");
  const messageStore = await MessageStore.deploy();
  await messageStore.waitForDeployment();

  const address = await messageStore.getAddress();
  console.log("MessageStore deployed to:", address);

  console.log("Add the following to your .env file:");
  console.log(`CONTRACT_ADDRESS=${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 
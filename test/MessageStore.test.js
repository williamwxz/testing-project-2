const { expect } = require("chai");

describe("MessageStore", function () {
  let messageStore;
  let owner;
  let otherAccount;

  beforeEach(async function () {
    [owner, otherAccount] = await ethers.getSigners();
    
    const MessageStore = await ethers.getContractFactory("MessageStore");
    messageStore = await MessageStore.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await messageStore.owner()).to.equal(owner.address);
    });
  });

  describe("Store Message", function () {
    it("Should store a message when called by owner", async function () {
      const testMessage = "Hello, Blockchain!";
      await messageStore.storeMessage(testMessage);
      expect(await messageStore.retrieveMessage()).to.equal(testMessage);
    });

    it("Should fail when called by non-owner", async function () {
      await expect(
        messageStore.connect(otherAccount).storeMessage("Test")
      ).to.be.revertedWith("Only owner can perform this action");
    });

    it("Should fail when message is empty", async function () {
      await expect(
        messageStore.storeMessage("")
      ).to.be.revertedWith("Message cannot be empty");
    });
  });

  describe("Events", function () {
    it("Should emit MessageStored event", async function () {
      const testMessage = "Hello, Blockchain!";
      await expect(messageStore.storeMessage(testMessage))
        .to.emit(messageStore, "MessageStored")
        .withArgs(owner.address, testMessage);
    });
  });
}); 
const hre = require("hardhat");

async function main() {
  const Promissory = await hre.ethers.getContractFactory("ERC20Token");
  const promissory = await Promissory.deploy("Tether", "USDT", 1000000);//'0x78315cF7082dBb0174da3286D436BfE7577dF836','0x2aC68A7Fa635972335d1d0880aa8861c5a46Bf88');

  await promissory.deployed();

  console.log(`ERC20 deployed on polygon mumbai to ${promissory.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

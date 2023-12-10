const ethers = require('ethers');
const { Promissory } = require('../contracts/Promissory.sol'); // Adjust the path accordingly

// Set up provider and wallet instances
const provider = new ethers.providers.JsonRpcProvider('https://rpc.public.zkevm-test.net');
const wallet1 = new ethers.Wallet('0x566E21aFE80E341A2B542A7a1d068202c3b9dD69', provider); // Replace 'private_key_1' with the first private key
const wallet2 = new ethers.Wallet('8e2a729b8a61ae8c3c4793f7b48fae2e31c8eed099a50ff2beacaafc35f17141', provider); // Replace 'private_key_2' with the second private key

// Connect to the Promissory contract
const promissoryAddress = '0xB1fEB0D11c2311990955c5606EF12dFC8a36C95c'; // Replace with the actual contract address
const promissoryContract = new ethers.Contract(promissoryAddress, Promissory.interface, wallet1);

// Call addProperty function using wallet1
async function callAddProperty() {
    const tx = await promissoryContract.addProperty(
        'Property1',
        'P1',
        ethers.utils.parseUnits('1000', '18'), // Token Supply
        ethers.utils.parseUnits('5', '2'), // Interest Rate (5%)
        30 // Locking Period
    );
    await tx.wait();
    console.log('addProperty transaction completed');
}

// Call approveProperty function using wallet2
async function callApproveProperty(propertyId) {
    const tx = await promissoryContract.connect(wallet2).approveProperty(propertyId);
    await tx.wait();
    console.log('approveProperty transaction completed');
}

// Example usage
callAddProperty().then(() => {
    // Assuming propertyId is 0 for the newly added property
    callApproveProperty(0);
});

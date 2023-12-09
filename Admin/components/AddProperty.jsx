// import necessary modules and components
import { useState } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import styles from "@/styles/Home.module.css";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";
import { Button } from "react-bootstrap";

// import contract addresses and ABI
const contractAddresses = require("../constants/contractaddress.json");
const abi = require("../constants/Promissory-abi.json");

export default function AddProperty(props) {
  // initialize required state variables using useState hook
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenSupply, setTokenSupply] = useState("");
  const [intrestRate, setIntrestRate] = useState("");
  const [lockingPeriod, setLockingPeroiod] = useState("");

  // retrieve chain ID and runContractFunction from Moralis
  const { chainId: hexChainId } = useMoralis();
  const { runContractFunction } = useWeb3Contract();

  // retrive dispatch function from web3uikit
  const { setModal } = props;
  const dispatch = useNotification();

  const chainId = parseInt(hexChainId); // Convert the hexadecimal chain ID to an integer

  const permissoryAddresses =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null; // Get the contract address for the given chain ID from the JSON file

  // function handleSubmit for handling the event on the Add Property Button

  async function handleSubmit(event) {
    event.preventDefault(); //For preventing Default Bhaviour of Submit Form Button

    // Call the smart contract function addProperty to add a new property with all necessary parameters
    await runContractFunction({
      params: {
        abi: abi,
        contractAddress: permissoryAddresses,
        functionName: "addProperty",
        params: {
          _tokenName: tokenName,
          _tokenSymbol: tokenSymbol,
          _tokenSupply: tokenSupply,
          _interestRate: intrestRate,
          _lockingPeriod: lockingPeriod,
        },
      },
      onSuccess: handleSuccess, // Set the success callback function
      onError: (error) => console.log(error), // Set the error callback function
    });

    // Reset the form inputs after submitting the form
    setTokenName("");
    setTokenSymbol("");
    setIntrestRate("");
    setLockingPeroiod("");
    setTokenSupply("");
    setModal(false);
  }

  // function handleSuccess for handling after success code
  async function handleSuccess(tx) {
    const transactionReceipt = await tx.wait(1);
    console.log(transactionReceipt);

    // Extract the property ID and token name from the event emitted by the smart contract
    const property_id = transactionReceipt.events[0].args[0].toString();
    const property_token = transactionReceipt.events[0].args[2].toString();

    //Dispatching the Notification after Successfully Adding Property
    dispatch({
      type: "info",
      message: `${property_token} Added to Property`,
      title: "Network Notification",
      position: "topL",
      icon: "bell",
    });

    props.setRefresh((state) => {
      return !state;
    });
  }

  // Returning JSX for addProperty component

  return (
    <div>
      <form
        key={"addProperty"}
        className={styles.mainForm}
        onSubmit={handleSubmit}
      >
        <div className={styles.second_form_container}>
          <label htmlFor="TokenName" className={styles.property_label}>
            TokenName:
          </label>
          <input
            type="text"
            id="tokenName"
            name="tokenName"
            className={styles.form_input}
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
          />
        </div>
        <div className={styles.second_form_container}>
          <label htmlFor="TokenSymbol" className={styles.property_label}>
            TokenSymbol:
          </label>
          <input
            type="text"
            id="tokenSymbol"
            name="tokenSymbol"
            className={styles.form_input}
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
          />
        </div>
        <div className={styles.second_form_container}>
          <label htmlFor="tokensupply" className={styles.property_label}>
            TokenSUpply :
          </label>
          <input
            type="number"
            id="tokenSupply"
            name="tokenSupply"
            className={styles.form_input}
            value={tokenSupply}
            onChange={(e) => setTokenSupply(e.target.value)}
          />
        </div>
        <div className={styles.second_form_container}>
          <label htmlFor="intrestRate" className={styles.property_label}>
            IntrestRate :
          </label>
          <input
            type="number"
            id="intrestRate"
            name="intrestRatee"
            className={styles.form_input}
            value={intrestRate}
            onChange={(e) => setIntrestRate(e.target.value)}
          />
        </div>
        <div className={styles.second_form_container}>
          <label htmlFor="lockingPeriod" className={styles.property_label}>
            LockingPeriod :
          </label>
          <input
            type="number"
            id="lockingPeriod"
            name="lockingPeriod"
            className={styles.form_input}
            value={lockingPeriod}
            onChange={(e) => setLockingPeroiod(e.target.value)}
          />
        </div>
        <div className={styles.btn_wrapper}>
          <Button
            type="submit"
            className={styles.property_btn}
            onClick={handleSubmit}
          >
            Add Property
          </Button>
        </div>
      </form>
    </div>
  );
}

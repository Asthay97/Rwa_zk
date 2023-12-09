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
/**
 * Invest calculator
 */
export default function Invest(props) {
  // initialize required state variables using useState hook
  const [propertyId, setPropertyId] = useState(props.editData.propertyId);
  const [amount, setAmount] = useState("");

  // retrieve chain ID and runContractFunction from Moralis
  const { chainId: hexChainId } = useMoralis();
  const { runContractFunction } = useWeb3Contract();
  const dispatch = useNotification();

  // Convert the hexadecimal chain ID to an integer
  const chainId = parseInt(hexChainId);

  const permissoryAddresses =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null; // Get the contract address for the given chain ID from the JSON file

  /**
   * function handleSubmit for handling the event on the Invest Button
   * @param event
   *  */
  async function handleSubmit(event) {
    event.preventDefault(); //For preventing Default Bhaviour of Submit Form Button

    // Calling the investInProperty function on the smart contract with all necessary parameters
    await runContractFunction({
      params: {
        abi: abi,
        contractAddress: permissoryAddresses,
        functionName: "investInProperty",
        params: {
          _propertyId: propertyId,
          _investmentAmount: amount,
        },
      },

      onSuccess: handleSuccess, // Handling successful transaction
      onError: handleError, // Handling error during transaction
    });
    props.setModal(false);

    // Resetting the propertyId and amount states after submission
    setAmount("");
    setPropertyId("");
  }

  async function handleError(error) {
    console.log(error);
    dispatch({
      type: "info",
      message: `investment failed`,
      title: "Investment Failed",
      position: "topL",
      icon: "bell",
    });
  }

  async function handleSuccess(tx) {
    const transactionReceipt = await tx.wait(1);
    console.log(transactionReceipt);

    dispatch({
      type: "info",
      message: ` Invested ${amount} USDT  `,
      title: " Investment Notification",
      position: "topL",
      icon: "bell",
    });

    props.setRefresh((state) => {
      return !state;
    });
  }

  // Returning JSX for Invest component
  return (
    <div>
      <form key={"invest"} className="form" onSubmit={handleSubmit}>
        <div className={styles.second_form_container}>
          <label htmlFor="propertyid" className={styles.property_label}>
            Property Id:
          </label>
          <input
            type="number"
            id="propertyid"
            name="propertyId"
            className={styles.form_input}
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
          />
        </div>
        <div className={styles.second_form_container}>
          <label htmlFor="amount" className={styles.property_label}>
            Amount:
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className={styles.form_input}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className={styles.btn_wrapper}>
          <Button
            type="submit"
            className={styles.property_btn}
            onClick={handleSubmit}
          >
            Invest
          </Button>
        </div>
      </form>
    </div>
  );
}

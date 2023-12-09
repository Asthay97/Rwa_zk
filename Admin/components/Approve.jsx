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

export default function Approve(props) {
  // initialize required state variables using useState hook
  const [propertyId, setPropertyId] = useState(props.editData.propertyId);

  // retrieve chain ID and runContractFunction from Moralis
  const { chainId: hexChainId } = useMoralis();
  const { runContractFunction } = useWeb3Contract();

  // retrive dispatch function from web3uikit
  const dispatch = useNotification();

  // Convert the hexadecimal chain ID to an integer
  const chainId = parseInt(hexChainId);

  // Get the contract address for the given chain ID from the JSON file
  const permissoryAddresses =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  // function handleSubmit for handling the event on the approveProperty Button
  async function handleSubmit(event) {
    event.preventDefault();

    // Calling the approveProperty function on the smart contract with all necessary parameters
    await runContractFunction({
      params: {
        abi: abi,
        contractAddress: permissoryAddresses,
        functionName: "approveProperty",
        params: {
          _propertyId: propertyId,
        },
      },
      onSuccess: handleSuccess, // Set the success callback function
      onError: handleError, // Set the error callback function
    });

    // Reset the form inputs after submitting the form
    setPropertyId("");

    props.setModal(false);
  }

  // function handleError for handling after error  code
  async function handleError(error) {
    const message = error.data.message;
    dispatch({
      type: "info",
      message: `${message}`,
      title: "Approval failed",
      position: "topL",
      icon: "bell",
    });
  }

  // function handleSuccess for handling after success code
  async function handleSuccess(tx) {
    const transactionReceipt = await tx.wait(1);
    console.log(transactionReceipt);

    //Dispatching the Notification after Successfully updating Intrest
    dispatch({
      type: "info",
      message: ` Property Approved`,
      title: "Approval Notification",
      position: "topL",
      icon: "bell",
    });

    props.setRefresh((state) => {
      return !state;
    });
  }

  // Returning JSX for Approve component
  return (
    <>
      <div>
        <form key={"approve"} className="form" onSubmit={handleSubmit}>
          <div className={styles.second_form_container}>
            <label htmlFor="propertyId" className={styles.property_label}>
              Property Id:
            </label>
            <input
              type="number"
              id="propertyid"
              name="propertyId"
              disabled={props.editData ? true : false}
              className={styles.form_input}
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
            />
          </div>

          <div className={styles.btn_wrapper}>
            <Button
              type="submit"
              className={styles.property_btn}
              onClick={handleSubmit}
            >
              Approve
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

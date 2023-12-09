import { createAsyncThunk } from "@reduxjs/toolkit";

import abi from "../../constants/abi.json";
import { ethers } from "ethers";

export const fetchPropertyData = createAsyncThunk(
  "property/fetchPropertyData",
  async () => {
    console.log("Log FROM INSDE thunk   ............................");
    async function fetchData() {
      console.log("INSiDE OF the FetchData  function");
      const provider = new ethers.providers.JsonRpcProvider(
        "https://polygon-mumbai.g.alchemy.com/v2/KFGiZ9X78dt4jBe16IjpjVXbhlPzuSx8"
      );
      const contractAddress = "0x88803A6B977eFfD33d6D5Fc032D9666Fde1D2E04";
      const contract = new ethers.Contract(contractAddress, abi, provider);
      try {
        console.log("Inside of try");
        const property = await contract.getProperties();

        console.log("PROPERTIES", property);
        const propertyString = String(property);
        const inputPropertyArray = propertyString.split(",");

        const resultPropertyArray = [];

        for (let i = 0; i < inputPropertyArray.length; i += 8) {
          const obj = {
            propertyId: inputPropertyArray[i],
            owner: inputPropertyArray[i + 1],
            tokenName: inputPropertyArray[i + 2],
            tokenSymbol: inputPropertyArray[i + 3],
            tokenSupply: inputPropertyArray[i + 4],
            interestRate: inputPropertyArray[i + 5],
            lockingPeriod: inputPropertyArray[i + 6],
            status: inputPropertyArray[i + 7],
          };
          resultPropertyArray.push(obj);
        }

        console.log("From inside Thunk", resultPropertyArray);

        const propertiesWithInvestments = await Promise.all(
          resultPropertyArray.map(async (property) => {
            const investment = await getInvestment(property.propertyId);
            return { ...property, investment };
          })
        );

        return propertiesWithInvestments;
      } catch (err) {
        console.log("Error from fetching  data", err);
        return [];
      }
    }

    const data = await fetchData();
    console.log("DTAA OF THUNK", data);
    return data;
  }
);

// Function to fetch investments for a specific property
const getInvestment = async (propertyId) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://polygon-mumbai.g.alchemy.com/v2/KFGiZ9X78dt4jBe16IjpjVXbhlPzuSx8"
    );
    const contractAddress = "0x88803A6B977eFfD33d6D5Fc032D9666Fde1D2E04";
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const investment = await contract.totalInvestedAmount(propertyId);

    return investment.toString();
  } catch (error) {
    console.log("Error fetching investment:", error);
    return null;
  }
};

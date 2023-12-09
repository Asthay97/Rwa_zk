import { createSlice } from "@reduxjs/toolkit";
// import serialize from "serialize-javascript";
// import flatted from "flatted";

const initialState = {
  isConnected: false,
  currentAccount: "",
  web3Provider: null,
};
const connectedSlice = createSlice({
  name: "connected",
  initialState,
  reducers: {
    setConnectedStatus: (state, action) => {
      state.isConnected = action.payload;
    },
    setCurrentAccount: (state, action) => {
      state.currentAccount = action.payload;
    },

    resetConnected: () => initialState,
  },
});

export const {
  setConnectedStatus,
  setCurrentAccount,
  setWeb3Provider,
  resetConnected,
} = connectedSlice.actions;
export default connectedSlice.reducer;

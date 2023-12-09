import { createSlice } from "@reduxjs/toolkit";
import { fetchPropertyData } from "./thunks";

const propertySlice = createSlice({
  name: "property",
  initialState: [],
  reducers: {
    updateProperty: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPropertyData.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { updateProperty } = propertySlice.actions;
export default propertySlice.reducer;

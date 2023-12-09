import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./reducer";
import connectedSilceReducer from "./connectedSilce";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, connectedSilceReducer);

const store = configureStore({
  reducer: {
    property: propertyReducer,
    connected: persistedReducer,
  },
});
export const persistor = persistStore(store);
export default store;

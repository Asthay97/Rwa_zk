import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ErrorPage from "./error-page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { MoralisProvider } from "react-moralis";
import { Provider } from "react-redux";
import store from "./store";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertyData } from "./store/thunks";
import { useState, useEffect } from "react";

import Login from "./login/login";
import Register from "./register/register";
import Dashboard from "./dashboard/dashboard";
import MarketPlace from "./marketPlace/marketPlace";
import KYC from "./kyc/kyc";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/kyc",
    element: <KYC />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/marketplace",
    element: <MarketPlace />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
]);

const Main = (props) => {
  console.log("From main Page");

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Inside Main page Effect ");
    dispatch(fetchPropertyData());
    // fetchData();
  }, []);

  // return

  return (
    <React.StrictMode>
      <MoralisProvider initializeOnMount={false}>
        <RouterProvider router={router}></RouterProvider>
      </MoralisProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Main />
    </PersistGate>
  </Provider>
);

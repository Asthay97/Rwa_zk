import "./dashboard.css";
import { useState, useEffect } from "react";

import { ethers } from "ethers";
import abi from "../../constants/abi.json";
import { ConnectButton } from "web3uikit";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useMoralis, useWeb3Contract } from "react-moralis";
import {
  setConnectedStatus,
  setCurrentAccount,
  resetConnected,
} from "../store/connectedSilce";

import { useDispatch, useSelector } from "react-redux";
import { decryptJsonWallet } from "@ethersproject/json-wallets";

export default function Dashboard() {
  const [isConnected, setIsConnected] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);
  const [userProperties, setUserProperties] = useState([]);
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.property);
  console.log("STATE FROM Redux inside Dashboard", properties);

  const {
    chainId: hexChainId,
    isWeb3Enabled,
    account,
    web3,
    Moralis,
  } = useMoralis();
  const iface = new ethers.utils.Interface(abi);

  console.log("Web3 Enabled", isWeb3Enabled);
  console.log("ACCOUNT", account);
  console.log("PROVIDER", web3);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${month}/${day}/${year} ${hours}:${minutes}`;
  }
  async function fetchData() {
    const provider = new ethers.providers.EtherscanProvider("maticmum");
    const contractAddress = "0x88803A6B977eFfD33d6D5Fc032D9666Fde1D2E04";

    try {
      const txHistory = await provider.getHistory(contractAddress);
      console.log("Transaction History ", txHistory);
      setTransactions(txHistory);
    } catch (err) {
      console.log("Error getiing History", err);
    }
  }

  // const connectToMetaMask = async () => {
  //   console.log("INSEDE THE FUNCTION");
  //   try {
  //     // Check if MetaMask is installed
  //     if (typeof window.ethereum !== "undefined") {
  //       // if (isConnected) {
  //       //   // Disconnect if already connected

  //       //   setIsConnected(false);
  //       //   setCurrentAccount("");
  //       //   setUserProperties([]);
  //       //   console.log("INSIDE DISCONNECT");
  //       // } else {
  //       // Connect to MetaMask
  //       const accounts = await window.ethereum.request({
  //         method: "eth_requestAccounts",
  //       });
  //       const initialAccount = accounts[0];
  //       setCurrentAccount(initialAccount);
  //       const filteredProperties = properties.filter(
  //         (property) => property.owner.toLowerCase() === initialAccount
  //       );
  //       console.log(filteredProperties);
  //       setUserProperties(filteredProperties);

  //       setIsConnected(true);
  //       console.log("CONNECTED IS ACTIVE");

  //       // Subscribe to account changes
  //       //}
  //     } else {
  //       // MetaMask is not installed, handle this case
  //       console.log("METASAK not installed");
  //     }
  //   } catch (error) {
  //     // Handle error
  //     console.error("Error froon function", error);
  //   }
  // };
  // window.ethereum.on("accountsChanged", async () => {
  //   connectToMetaMask();
  // });

  // // Detect change in Metamask account
  // useEffect(() => {
  //   if (window.ethereum) {
  //     window.ethereum.on("chainChanged", () => {
  //       connectToMetaMask();
  //     });
  //     window.ethereum.on("accountsChanged", (accounts) => {
  //       console.log("ACCOUNTS", accounts);
  //       console.log("LENGTH", accounts.length);

  //       if (accounts.length > 0) {
  //         connectToMetaMask();
  //       } else {
  //         setIsConnected(false);
  //         setCurrentAccount("");
  //       }
  //     });
  //   }
  // });

  useEffect(() => {
    console.log("Hello From first Effect");
    fetchData();
  }, [properties]);

  useEffect(() => {
    console.log("Inside Effect from Dashboard");
    if (account !== null) {
      const filteredProperties = properties.filter(
        (property) => property.owner.toLowerCase() === account
      );
      console.log(filteredProperties);
      if (transactions) {
        const addressTransactions = transactions.filter((transaction) => {
          return (
            transaction.from.toLowerCase() == account ||
            (transaction.to && transaction.to.toLowerCase() == account)
          );
        });
        console.log("ADDRESS SPECIFIC TRNASACTIONS ", addressTransactions);
        setUserTransactions(addressTransactions);
      }

      dispatch(setConnectedStatus(true));
      dispatch(setCurrentAccount(account));
      setUserProperties(filteredProperties);
    } else {
      setUserProperties([]);
      setUserTransactions([]);
      dispatch(resetConnected());
    }
  }, [account, properties]);

  return (
    <div>
      <head>
        <title>PROMISSORY | Dashboard</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <div className="root-container d-flex">
        <div className="menu-bar px-2 py-2 py-md-3 d-flex flex-column align-items-center menu-bar-desktop">
          <i
            className="fa fa-bars text-white hamburger-icon fs-14"
            aria-hidden="true"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions"
            aria-controls="offcanvasWithBothOptions"
          ></i>

          <img src="/UpiCrypto.png" alt="..." className="mb-5 brand-logo" />

          <a
            href="#"
            id="mi-1"
            className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
          >
            <i
              className="fa fa-th text-white mb-0 fs-14 menu-bar-icon mbi-1 active"
              aria-hidden="true"
            ></i>
            my assets
          </a>

          <a
            href="#"
            id="mi-2"
            className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
          >
            <i
              className="fa fa-cog text-white mb-0 fs-14 menu-bar-icon mbi-2"
              aria-hidden="true"
            ></i>
            market place
          </a>

          <a
            href="#"
            id="mi-3"
            className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
          >
            <i
              className="fa fa-cog text-white mb-0 fs-14 menu-bar-icon mbi-3"
              aria-hidden="true"
            ></i>
            refer & earn
          </a>

          <a
            href="#"
            id="mi-4"
            className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
          >
            <i
              className="fa fa-cog text-white mb-0 fs-14 menu-bar-icon mbi-4"
              aria-hidden="true"
            ></i>
            transactions
          </a>

          <a
            href="#"
            id="mi-5"
            className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
          >
            <i
              className="fa fa-cog text-white mb-0 fs-14 menu-bar-icon mbi-5"
              aria-hidden="true"
            ></i>
            wallet
          </a>

          <a
            href="#"
            id="mi-6"
            className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
          >
            <i
              className="fa fa-cog text-white mb-0 fs-14 menu-bar-icon mbi-6"
              aria-hidden="true"
            ></i>
            taxes
          </a>

          <a
            href="#"
            id="mi-7"
            className="menu-item menu-item-setting text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
          >
            <i
              className="fa fa-cog pri-clr mb-0 fs-14 menu-bar-icon mbi-7"
              aria-hidden="true"
            ></i>
            settings
          </a>
        </div>

        <div
          className="offcanvas offcanvas-mobile offcanvas-start d-none"
          data-bs-scroll="false"
          tabindex="-1"
          id="offcanvasWithBothOptions"
          aria-labelledby="offcanvasWithBothOptionsLabel"
        >
          <div className="offcanvas-body d-flex flex-column align-items-center h-100">
            <a
              data-bs-dismiss="offcanvas"
              href="#"
              id="mi-1"
              className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
            >
              <i
                className="fa fa-th text-white mb-0 fs-14 menu-bar-icon mbi-1 active"
                aria-hidden="true"
              ></i>
              my assets
            </a>

            <a
              data-bs-dismiss="offcanvas"
              href="#"
              id="mi-2"
              className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
            >
              <i
                className="fa fa-cog text-white mb-0 fs-14 menu-bar-icon mbi-2"
                aria-hidden="true"
              ></i>
              market place
            </a>

            <a
              data-bs-dismiss="offcanvas"
              href="#"
              id="mi-3"
              className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
            >
              <i
                className="fa fa-cog text-white mb-0 fs-14 menu-bar-icon mbi-3"
                aria-hidden="true"
              ></i>
              refer & earn
            </a>

            <a
              data-bs-dismiss="offcanvas"
              href="#"
              id="mi-4"
              className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
            >
              <i
                className="fa fa-cog text-white mb-0 fs-14 menu-bar-icon mbi-4"
                aria-hidden="true"
              ></i>
              transactions
            </a>

            <a
              data-bs-dismiss="offcanvas"
              href="#"
              id="mi-5"
              className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
            >
              <i
                className="fa fa-cog text-white mb-0 fs-14 menu-bar-icon mbi-5"
                aria-hidden="true"
              ></i>
              wallet
            </a>

            <a
              data-bs-dismiss="offcanvas"
              href="#"
              id="mi-6"
              className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
            >
              <i
                className="fa fa-cog text-white mb-0 fs-14 menu-bar-icon mbi-6"
                aria-hidden="true"
              ></i>
              taxes
            </a>

            <a
              data-bs-dismiss="offcanvas"
              href="#"
              id="mi-7"
              className="menu-item menu-item-setting text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
            >
              <i
                className="fa fa-cog pri-clr mb-0 fs-14 menu-bar-icon mbi-7"
                aria-hidden="true"
              ></i>
              settings
            </a>
          </div>
        </div>

        <div className="container-fluid promissory-container p-0">
          <div className="row m-0 h-100">
            <div className="col-12 col-sm-7 col-md-8 col-lg-9 p-0">
              <div className="content-left h-100vh p-3 dashboard-content-left">
                <div className="header d-flex align-items-center justify-content-between pb-1 mb-4">
                  <p className="black-clr text-capitalize mb-0 fw-500 fs-14">
                    good morning
                    <span className="pri-clr text-capitalize username">
                      oliver<span>!</span>
                    </span>
                  </p>
                  <p className="black-clr font-light mb-0 fs-12 fw-100">
                    Last logged in 20 Mar 2023 10:10 am
                  </p>
                </div>

                <div className="row m-0">
                  <div className="col-12 col-lg-6 p-0 pe-0 pe-lg-2">
                    <h6 className="text-uppercase sec-clr mb-1">
                      ASSETS OVERVIEW
                    </h6>

                    <div className="px-2 dashboard-card mb-2 mb-lg-3">
                      <div className="row m-0">
                        <div className="col-2 d-flex align-items-center justify-content-center p-0 py-3">
                          <img src="/balance.PNG" alt="..." className="" />
                        </div>
                        <div className="col-5 d-flex flex-column align-items-start justify-content-between px-2 py-3 bx-shdw">
                          <div className="dets-in-labl-val d-flex flex-column mb-3">
                            <span className="black-clr fs-11">
                              Account Value
                              <i
                                className="fa fa-info-circle sec-clr"
                                aria-hidden="true"
                              ></i>
                            </span>
                            <span className="black-clr fw-500"> $0.00 </span>
                          </div>
                          <div className="dets-in-labl-val d-flex flex-column">
                            <span className="black-clr fs-11">
                              Available Balance
                              <i
                                className="fa fa-info-circle sec-clr"
                                aria-hidden="true"
                              ></i>
                            </span>
                            <span className="black-clr fw-500"> $0.00 </span>
                          </div>
                        </div>
                        <div className="col-5 p-0 ps-2 py-3">
                          <div className="action-btns d-flex justify-content-center">
                            <div
                              className="btn-group d-flex flex-column"
                              role="group"
                              aria-label="Basic radio toggle button group"
                            >
                              <input
                                type="radio"
                                className="btn-check"
                                name="btnradio"
                                id="deposit"
                                autocomplete="off"
                                checked
                              />
                              <label
                                className="btn btn-outline-primary mb-2 py-1"
                                for="deposit"
                              >
                                Deposit
                              </label>

                              <input
                                type="radio"
                                className="btn-check"
                                name="btnradio"
                                id="withdraw"
                                autocomplete="off"
                              />
                              <label
                                className="btn btn-outline-primary py-1"
                                for="withdraw"
                              >
                                withdraw
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-2 dashboard-card">
                      <div className="row m-0">
                        <div className="col-2 d-flex align-items-center justify-content-center p-0 py-3">
                          <img src="/balance.PNG" alt="..." className="" />
                        </div>
                        <div className="col-5 d-flex flex-column align-items-start justify-content-between px-2 py-3">
                          <div className="dets-in-labl-val d-flex flex-column mb-3">
                            <span className="black-clr fs-11">
                              Total Rent Earned
                            </span>
                            <span className="black-clr fw-500"> $0.00 </span>
                          </div>
                          <div className="dets-in-labl-val d-flex flex-column">
                            <span className="black-clr fs-11">
                              {" "}
                              Rent Balance{" "}
                            </span>
                            <span className="black-clr fw-500"> $0.00 </span>
                          </div>
                        </div>
                        <div className="col-5 d-flex flex-column align-items-start justify-content-between px-2 py-3">
                          <div className="dets-in-labl-val d-flex flex-column mb-3">
                            <span className="black-clr fs-11">
                              Properties Owned
                              <i
                                className="fa fa-info-circle sec-clr"
                                aria-hidden="true"
                              ></i>
                            </span>
                            <span className="black-clr fw-500"> 0 </span>
                          </div>
                          <div className="dets-in-labl-val d-flex flex-column">
                            <span className="black-clr fs-11">
                              Est. Property Value
                              <i
                                className="fa fa-info-circle sec-clr"
                                aria-hidden="true"
                              ></i>
                            </span>
                            <span className="black-clr fw-500 d-flex align-items-center">
                              $0.00
                              <div className="property-indicator increased-percent d-flex align-items-center ms-1">
                                <span className="text-danger fs-10"> 0% </span>
                                <i className="fa fa-arrow-down text-danger ms-1 fs-10"></i>
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 p-0 ps-0 ps-lg-2">
                    <h6 className="text-uppercase sec-clr mb-1 mt-3 mt-lg-0">
                      MY WALLET
                    </h6>

                    <div className="px-2 dashboard-card">
                      <div className="row m-0">
                        <div className="col-2 d-flex flex-column align-items-center justify-content-center p-0 py-3">
                          <img src="/balance.PNG" alt="..." className="" />
                          <button
                            type="button"
                            className="btn promissory-trnsprnt-link wallet-address-link p-0 fs-11 blue-clr text-center"
                          >
                            {account ? account.slice(0, 6) + "..." : "0x"}
                          </button>
                        </div>
                        <div className="col-5 d-flex flex-column align-items-start justify-content-between px-2 py-3">
                          <div className="dets-in-labl-val d-flex flex-column mb-3">
                            <span className="black-clr fs-11">
                              Wallet Value
                              <i
                                className="fa fa-info-circle sec-clr"
                                aria-hidden="true"
                              ></i>
                            </span>
                            <span className="black-clr fw-500"> $0.00 </span>
                          </div>
                          <div className="dets-in-labl-val d-flex flex-column">
                            <span className="black-clr fs-11">
                              Crypto Value
                              <i
                                className="fa fa-info-circle sec-clr"
                                aria-hidden="true"
                              ></i>
                            </span>
                            <span className="black-clr fw-500"> $0.00 </span>
                          </div>
                        </div>
                        <div className="col-5 d-flex flex-column align-items-start justify-content-between px-2 py-3">
                          <div className="dets-in-labl-val d-flex flex-column mb-3">
                            <span className="black-clr fs-11">
                              Property Value
                              <i
                                className="fa fa-info-circle sec-clr"
                                aria-hidden="true"
                              ></i>
                            </span>
                            <span className="black-clr fw-500"> $0.00 </span>
                          </div>
                        </div>
                        <div className="col-6 p-0 pb-3 pe-1">
                          <div className="graph p-2">
                            <div className="dets-in-labl-val d-flex flex-column mb-3 w-100">
                              <span className="black-clr fs-11"> Income </span>
                              <span className="black-clr fw-500"> $0.00 </span>
                            </div>
                            <img src="/graph.PNG" alt="..." />
                          </div>
                        </div>
                        <div className="col-6 p-0 pb-3 ps-1">
                          <div className="graph p-2">
                            <div className="dets-in-labl-val d-flex flex-column mb-3 w-100">
                              <span className="black-clr fs-11"> Income </span>
                              <span className="black-clr fw-500"> $0.00 </span>
                            </div>
                            <img src="/graph.PNG" alt="..." />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="transactions-list-data mt-4">
                  <div className="list-hdr d-flex flex-row align-items-center justify-content-between mb-1">
                    <h6 className="text-uppercase sec-clr mb-0">
                      recent transactions
                    </h6>
                    <button
                      type="button"
                      className="btn promissory-trnsprnt-btn text-uppercase p-0 fs-13 fw-500 pri-clr"
                    >
                      view all
                    </button>
                  </div>
                  <div className="transactions-list">
                    {userTransactions.length > 0 &&
                      userTransactions.map((tx) => (
                        <ol className="list-group list-group-horizontal-md mb-1">
                          <li style ={{textAlign: "center"}} className="list-group-item flex-fill">
                            {tx.blockNumber}
                          </li>
                          <li style ={{textAlign: "center"}} className="list-group-item flex-fill">
                            {iface.parseTransaction({ data: tx.data }).name}
                          </li>
                          <li style ={{textAlign: "center"}} className="list-group-item flex-fill">
                            {formatTimestamp(tx.timestamp)}
                          </li>
                          <li style ={{textAlign: "center"}} className="list-group-item flex-fill">
                            {tx.hash}
                          </li>
                          <li style ={{textAlign: "center"}} className="list-group-item flex-fill text-success">
                            Success
                          </li>
                        </ol>
                      ))}
                    {/* <ul className="list-group list-group-horizontal-md mb-1">
                      <li className="list-group-item flex-fill">#ID848489</li>
                      <li className="list-group-item flex-fill">
                        Transaction Name
                      </li>
                      <li className="list-group-item flex-fill">
                        Mm/dd/yyyy Hh:Mm
                      </li>
                      <li className="list-group-item flex-fill">
                        Reference Number
                      </li>
                      <li className="list-group-item flex-fill text-success">
                        Transaction Status
                      </li>
                    </ul>
                    <ul className="list-group list-group-horizontal-md mb-1">
                      <li className="list-group-item flex-fill">#ID848489</li>
                      <li className="list-group-item flex-fill">
                        Transaction Name
                      </li>
                      <li className="list-group-item flex-fill">
                        Mm/dd/yyyy Hh:Mm
                      </li>
                      <li className="list-group-item flex-fill">
                        Reference Number
                      </li>
                      <li className="list-group-item flex-fill text-danger">
                        Transaction Status
                      </li>
                    </ul>
                    <ul className="list-group list-group-horizontal-md mb-1">
                      <li className="list-group-item flex-fill">#ID848489</li>
                      <li className="list-group-item flex-fill">
                        Transaction Name
                      </li>
                      <li className="list-group-item flex-fill">
                        Mm/dd/yyyy Hh:Mm
                      </li>
                      <li className="list-group-item flex-fill">
                        Reference Number
                      </li>
                      <li className="list-group-item flex-fill text-danger">
                        Transaction Status
                      </li>
                    </ul>
                    <ul className="list-group list-group-horizontal-md mb-1">
                      <li className="list-group-item flex-fill">#ID848489</li>
                      <li className="list-group-item flex-fill">
                        Transaction Name
                      </li>
                      <li className="list-group-item flex-fill">
                        Mm/dd/yyyy Hh:Mm
                      </li>
                      <li className="list-group-item flex-fill">
                        Reference Number
                      </li>
                      <li className="list-group-item flex-fill text-success">
                        Transaction Status
                      </li>
                    </ul>
                    <ul className="list-group list-group-horizontal-md mb-1">
                      <li className="list-group-item flex-fill">#ID848489</li>
                      <li className="list-group-item flex-fill">
                        Transaction Name
                      </li>
                      <li className="list-group-item flex-fill">
                        Mm/dd/yyyy Hh:Mm
                      </li>
                      <li className="list-group-item flex-fill">
                        Reference Number
                      </li>
                      <li className="list-group-item flex-fill text-success">
                        Transaction Status
                      </li>
                    </ul>
                    <ul className="list-group list-group-horizontal-md mb-1">
                      <li className="list-group-item flex-fill">#ID848489</li>
                      <li className="list-group-item flex-fill">
                        Transaction Name
                      </li>
                      <li className="list-group-item flex-fill">
                        Mm/dd/yyyy Hh:Mm
                      </li>
                      <li className="list-group-item flex-fill">
                        Reference Number
                      </li>
                      <li className="list-group-item flex-fill text-success">
                        Transaction Status
                      </li>
                    </ul> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-5 col-md-4 col-lg-3 p-0">
              <div className="content-right h-100 p-3 ps-2">
                <div className="notification-details d-flex align-items-center justify-content-between mb-4">
                  <div className="notifications-left">
                    {/* <span className="badge bg-white black-clr p-2">
                      #<span className="count pri-clr">10</span>
                      <i
                        className="fa fa-trophy black-clr ps-2"
                        aria-hidden="true"
                      ></i>
                    </span> */}

                    <span
                      className="badge bg-white black-clr"
                      style={{
                        padding: "0",
                        margin: "0",
                        // width: "278px",
                      }}
                    >
                      <ConnectButton moralisAuth={false} />
                      {/* <span className="count pri-clr">0.00</span>
                      <i
                        className="fa fa-certificate black-clr ps-2"
                        aria-hidden="true"
                      ></i> */}
                    </span>
                  </div>
                  <div
                    className="notifications-right"
                    style={{
                      display: "flex",
                      margin: "0 0px 0px 5px",
                    }}
                  >
                    <span className="badge bg-white black-clr p-2">
                      <i
                        className="fa fa-square-o black-clr"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span className="badge bg-white black-clr p-2 position-relative ms-1">
                      <i
                        className="fa fa-bell-o black-clr"
                        aria-hidden="true"
                      ></i>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        09
                      </span>
                    </span>
                  </div>
                </div>

                <div className="my-properties-data">
                  <h6 className="text-uppercase sec-clr mb-1">
                    my properties / market place
                  </h6>
                  <ul className="list-group">
                    {userProperties.length > 0 &&
                      userProperties.map((property) => (
                        <li className="list-group-item border-0 p-2 mb-1">
                          <div className="row m-0">
                            <div className="col-4 p-0 pe-2">
                              <img
                                src="/home1.jpg"
                                alt=""
                                className="property-img"
                              />
                            </div>
                            <div className="col-8 p-0 d-flex flex-column justify-content-between">
                              <div className="adress-data">
                                <h6 className="mb-0 black-clr fs-14 fw-500">
                                  {property.tokenSymbol}
                                </h6>
                                <p className="mb-0 sec-clr fs-10 lh-10 fw-100">
                                  {property.tokenName}
                                </p>
                              </div>
                              <div className="irr-coc-data fs-10 d-flex">
                                <div className="irr me-3">
                                  <span className="pri-clr fw-500">IRR: </span>
                                  <span className="black-clr fw-500">
                                    {property.interestRate / 100}%
                                  </span>
                                </div>
                                <div className="coc">
                                  <span className="pri-clr fw-500">CoC: </span>
                                  <span className="black-clr fw-500">
                                    19.9%
                                  </span>
                                </div>
                              </div>
                            </div>
                            <hr className="hr-line" />
                            <div className="col-6 p-0 minimum-value-data">
                              <div className="content-left d-flex align-items-center">
                                <div className="d-flex flex-column pri-clr me-1">
                                  <span className="fs-13 fw-500 min-val">
                                    {" "}
                                    $52.86{" "}
                                  </span>
                                  <span className="fs-10 fw-500 lh-10 min-txt">
                                    MINIMUM
                                  </span>
                                </div>
                                <div className="d-flex align-items-center p-1 success-percent-data">
                                  <i className="fa fa-arrow-up text-success me-1 fs-10"></i>
                                  <span className="text-success fs-10 min-percent">
                                    6.36%
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-6 p-0 tokens-data">
                              <div className="content-right d-flex align-items-center justify-content-end bg-white">
                                <div className="d-flex flex-column align-items-end sec-clr me-1">
                                  <span className="fs-13 fw-500 black-clr tokens-val">
                                    {(
                                      (property.tokenSupply -
                                        property.investment) /
                                      10 ** 9
                                    ).toFixed(9)}
                                  </span>
                                  <span className="fs-10 fw-500 text-end sec-clr lh-10 tokens-txt">
                                    TOKENS LEFT
                                  </span>
                                </div>
                                <div>
                                  <div style={{ width: 30, height: 30 }}>
                                    <CircularProgressbar
                                      value={
                                        ((property.tokenSupply -
                                          property.investment) /
                                          property.tokenSupply) *
                                        100
                                      }
                                      text={`${
                                        ((property.tokenSupply -
                                          property.investment) /
                                          property.tokenSupply) *
                                        100
                                      }%`}
                                      counterClockwise={true}
                                      styles={{
                                        path: {
                                          stroke: `rgba(123, 41, 169, ${
                                            (((property.tokenSupply -
                                              property.investment) /
                                              property.tokenSupply) *
                                              100) /
                                            100
                                          })`,
                                        },
                                      }}
                                    />
                                  </div>

                                  {/* <img src="/progress-stat.PNG" alt="..." /> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    {/* <li className="list-group-item border-0 p-2 mb-1">
                      <div className="row m-0">
                        <div className="col-4 p-0 pe-2">
                          <img
                            src="/home1.jpg"
                            alt=""
                            className="property-img"
                          />
                        </div>
                        <div className="col-8 p-0 d-flex flex-column justify-content-between">
                          <div className="adress-data">
                            <h6 className="mb-0 black-clr fs-14 fw-500">
                              12507 Astro Ave
                            </h6>
                            <p className="mb-0 sec-clr fs-10 lh-10 fw-100">
                              Cleverland, Ohio 44135
                            </p>
                          </div>
                          <div className="irr-coc-data fs-10 d-flex">
                            <div className="irr me-3">
                              <span className="pri-clr fw-500">IRR: </span>
                              <span className="black-clr fw-500">19.9%</span>
                            </div>
                            <div className="coc">
                              <span className="pri-clr fw-500">CoC: </span>
                              <span className="black-clr fw-500">19.9%</span>
                            </div>
                          </div>
                        </div>
                        <hr className="hr-line" />
                        <div className="col-6 p-0 minimum-value-data">
                          <div className="content-left d-flex align-items-center">
                            <div className="d-flex flex-column pri-clr me-1">
                              <span className="fs-13 fw-500 min-val">
                                {" "}
                                $52.86{" "}
                              </span>
                              <span className="fs-10 fw-500 lh-10 min-txt">
                                MINIMUM
                              </span>
                            </div>
                            <div className="d-flex align-items-center p-1 success-percent-data">
                              <i className="fa fa-arrow-up text-success me-1 fs-10"></i>
                              <span className="text-success fs-10">
                                {" "}
                                6.36%{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-6 p-0 tokens-data">
                          <div className="content-right d-flex align-items-center justify-content-end bg-white">
                            <div className="d-flex flex-column align-items-end sec-clr me-1">
                              <span className="fs-13 fw-500 black-clr tokens-val">
                                5,636
                              </span>
                              <span className="fs-10 fw-500 text-end sec-clr lh-10 tokens-txt">
                                TOKENS LEFT
                              </span>
                            </div>
                            <div>
                              <img src="/progress-stat.PNG" alt="..." />
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item border-0 p-2 mb-1">
                      <div className="row m-0">
                        <div className="col-4 p-0 pe-2">
                          <img
                            src="/home1.jpg"
                            alt=""
                            className="property-img"
                          />
                        </div>
                        <div className="col-8 p-0 d-flex flex-column justify-content-between">
                          <div className="adress-data">
                            <h6 className="mb-0 black-clr fs-14 fw-500">
                              12507 Astro Ave
                            </h6>
                            <p className="mb-0 sec-clr fs-10 lh-10 fw-100">
                              Cleverland, Ohio 44135
                            </p>
                          </div>
                          <div className="irr-coc-data fs-10 d-flex">
                            <div className="irr me-3">
                              <span className="pri-clr fw-500">IRR: </span>
                              <span className="black-clr fw-500">19.9%</span>
                            </div>
                            <div className="coc">
                              <span className="pri-clr fw-500">CoC: </span>
                              <span className="black-clr fw-500">19.9%</span>
                            </div>
                          </div>
                        </div>
                        <hr className="hr-line" />
                        <div className="col-6 p-0 minimum-value-data">
                          <div className="content-left d-flex align-items-center">
                            <div className="d-flex flex-column pri-clr me-1">
                              <span className="fs-13 fw-500 min-val">
                                {" "}
                                $52.86{" "}
                              </span>
                              <span className="fs-10 fw-500 lh-10 min-txt">
                                MINIMUM
                              </span>
                            </div>
                            <div className="d-flex align-items-center p-1 success-percent-data">
                              <i className="fa fa-arrow-up text-success me-1 fs-10"></i>
                              <span className="text-success fs-10">
                                {" "}
                                6.36%{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-6 p-0 tokens-data">
                          <div className="content-right d-flex align-items-center justify-content-end bg-white">
                            <div className="d-flex flex-column align-items-end sec-clr me-1">
                              <span className="fs-13 fw-500 black-clr tokens-val">
                                5,636
                              </span>
                              <span className="fs-10 fw-500 text-end sec-clr lh-10 tokens-txt">
                                TOKENS LEFT
                              </span>
                            </div>
                            <div>
                              <img src="/progress-stat.PNG" alt="..." />
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item border-0 p-2 mb-1">
                      <div className="row m-0">
                        <div className="col-4 p-0 pe-2">
                          <img
                            src="/home1.jpg"
                            alt=""
                            className="property-img"
                          />
                        </div>
                        <div className="col-8 p-0 d-flex flex-column justify-content-between">
                          <div className="adress-data">
                            <h6 className="mb-0 black-clr fs-14 fw-500">
                              12507 Astro Ave
                            </h6>
                            <p className="mb-0 sec-clr fs-10 lh-10 fw-100">
                              Cleverland, Ohio 44135
                            </p>
                          </div>
                          <div className="irr-coc-data fs-10 d-flex">
                            <div className="irr me-3">
                              <span className="pri-clr fw-500">IRR: </span>
                              <span className="black-clr fw-500">19.9%</span>
                            </div>
                            <div className="coc">
                              <span className="pri-clr fw-500">CoC: </span>
                              <span className="black-clr fw-500">19.9%</span>
                            </div>
                          </div>
                        </div>
                        <hr className="hr-line" />
                        <div className="col-6 p-0 minimum-value-data">
                          <div className="content-left d-flex align-items-center">
                            <div className="d-flex flex-column pri-clr me-1">
                              <span className="fs-13 fw-500 min-val">
                                {" "}
                                $52.86{" "}
                              </span>
                              <span className="fs-10 fw-500 lh-10 min-txt">
                                MINIMUM
                              </span>
                            </div>
                            <div className="d-flex align-items-center p-1 success-percent-data">
                              <i className="fa fa-arrow-up text-success me-1 fs-10"></i>
                              <span className="text-success fs-10">
                                {" "}
                                6.36%{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-6 p-0 tokens-data">
                          <div className="content-right d-flex align-items-center justify-content-end bg-white">
                            <div className="d-flex flex-column align-items-end sec-clr me-1">
                              <span className="fs-13 fw-500 black-clr tokens-val">
                                5,636
                              </span>
                              <span className="fs-10 fw-500 text-end sec-clr lh-10 tokens-txt">
                                TOKENS LEFT
                              </span>
                            </div>
                            <div>
                              <img src="/progress-stat.PNG" alt="..." />
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item border-0 p-2 mb-1">
                      <div className="row m-0">
                        <div className="col-4 p-0 pe-2">
                          <img
                            src="/home1.jpg"
                            alt=""
                            className="property-img"
                          />
                        </div>
                        <div className="col-8 p-0 d-flex flex-column justify-content-between">
                          <div className="adress-data">
                            <h6 className="mb-0 black-clr fs-14 fw-500">
                              12507 Astro Ave
                            </h6>
                            <p className="mb-0 sec-clr fs-10 lh-10 fw-100">
                              Cleverland, Ohio 44135
                            </p>
                          </div>
                          <div className="irr-coc-data fs-10 d-flex">
                            <div className="irr me-3">
                              <span className="pri-clr fw-500">IRR: </span>
                              <span className="black-clr fw-500">19.9%</span>
                            </div>
                            <div className="coc">
                              <span className="pri-clr fw-500">CoC: </span>
                              <span className="black-clr fw-500">19.9%</span>
                            </div>
                          </div>
                        </div>
                        <hr className="hr-line" />
                        <div className="col-6 p-0 minimum-value-data">
                          <div className="content-left d-flex align-items-center">
                            <div className="d-flex flex-column pri-clr me-1">
                              <span className="fs-13 fw-500 min-val">
                                {" "}
                                $52.86{" "}
                              </span>
                              <span className="fs-10 fw-500 lh-10 min-txt">
                                MINIMUM
                              </span>
                            </div>
                            <div className="d-flex align-items-center p-1 success-percent-data">
                              <i className="fa fa-arrow-up text-success me-1 fs-10"></i>
                              <span className="text-success fs-10">
                                {" "}
                                6.36%{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-6 p-0 tokens-data">
                          <div className="content-right d-flex align-items-center justify-content-end bg-white">
                            <div className="d-flex flex-column align-items-end sec-clr me-1">
                              <span className="fs-13 fw-500 black-clr tokens-val">
                                5,636
                              </span>
                              <span className="fs-10 fw-500 text-end sec-clr lh-10 tokens-txt">
                                TOKENS LEFT
                              </span>
                            </div>
                            <div>
                              <img src="/progress-stat.PNG" alt="..." />
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item border-0 p-2 mb-1">
                      <div className="row m-0">
                        <div className="col-4 p-0 pe-2">
                          <img
                            src="/home1.jpg"
                            alt=""
                            className="property-img"
                          />
                        </div>
                        <div className="col-8 p-0 d-flex flex-column justify-content-between">
                          <div className="adress-data">
                            <h6 className="mb-0 black-clr fs-14 fw-500">
                              12507 Astro Ave
                            </h6>
                            <p className="mb-0 sec-clr fs-10 lh-10 fw-100">
                              Cleverland, Ohio 44135
                            </p>
                          </div>
                          <div className="irr-coc-data fs-10 d-flex">
                            <div className="irr me-3">
                              <span className="pri-clr fw-500">IRR: </span>
                              <span className="black-clr fw-500">19.9%</span>
                            </div>
                            <div className="coc">
                              <span className="pri-clr fw-500">CoC: </span>
                              <span className="black-clr fw-500">19.9%</span>
                            </div>
                          </div>
                        </div>
                        <hr className="hr-line" />
                        <div className="col-6 p-0 minimum-value-data">
                          <div className="content-left d-flex align-items-center">
                            <div className="d-flex flex-column pri-clr me-1">
                              <span className="fs-13 fw-500 min-val">
                                {" "}
                                $52.86{" "}
                              </span>
                              <span className="fs-10 fw-500 lh-10 min-txt">
                                MINIMUM
                              </span>
                            </div>
                            <div className="d-flex align-items-center p-1 success-percent-data">
                              <i className="fa fa-arrow-up text-success me-1 fs-10"></i>
                              <span className="text-success fs-10">
                                {" "}
                                6.36%{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-6 p-0 tokens-data">
                          <div className="content-right d-flex align-items-center justify-content-end bg-white">
                            <div className="d-flex flex-column align-items-end sec-clr me-1">
                              <span className="fs-13 fw-500 black-clr tokens-val">
                                5,636
                              </span>
                              <span className="fs-10 fw-500 text-end sec-clr lh-10 tokens-txt">
                                TOKENS LEFT
                              </span>
                            </div>
                            <div>
                              <img src="/progress-stat.PNG" alt="..." />
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item border-0 p-2 mb-1">
                      <div className="row m-0">
                        <div className="col-4 p-0 pe-2">
                          <img
                            src="/home1.jpg"
                            alt=""
                            className="property-img"
                          />
                        </div>
                        <div className="col-8 p-0 d-flex flex-column justify-content-between">
                          <div className="adress-data">
                            <h6 className="mb-0 black-clr fs-14 fw-500">
                              12507 Astro Ave
                            </h6>
                            <p className="mb-0 sec-clr fs-10 lh-10 fw-100">
                              Cleverland, Ohio 44135
                            </p>
                          </div>
                          <div className="irr-coc-data fs-10 d-flex">
                            <div className="irr me-3">
                              <span className="pri-clr fw-500">IRR: </span>
                              <span className="black-clr fw-500">19.9%</span>
                            </div>
                            <div className="coc">
                              <span className="pri-clr fw-500">CoC: </span>
                              <span className="black-clr fw-500">19.9%</span>
                            </div>
                          </div>
                        </div>
                        <hr className="hr-line" />
                        <div className="col-6 p-0 minimum-value-data">
                          <div className="content-left d-flex align-items-center">
                            <div className="d-flex flex-column pri-clr me-1">
                              <span className="fs-13 fw-500 min-val">
                                {" "}
                                $52.86{" "}
                              </span>
                              <span className="fs-10 fw-500 lh-10 min-txt">
                                MINIMUM
                              </span>
                            </div>
                            <div className="d-flex align-items-center p-1 success-percent-data">
                              <i className="fa fa-arrow-up text-success me-1 fs-10"></i>
                              <span className="text-success fs-10">
                                {" "}
                                6.36%{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-6 p-0 tokens-data">
                          <div className="content-right d-flex align-items-center justify-content-end bg-white">
                            <div className="d-flex flex-column align-items-end sec-clr me-1">
                              <span className="fs-13 fw-500 black-clr tokens-val">
                                5,636
                              </span>
                              <span className="fs-10 fw-500 text-end sec-clr lh-10 tokens-txt">
                                TOKENS LEFT
                              </span>
                            </div>
                            <div>
                              <img src="/progress-stat.PNG" alt="..." />
                            </div>
                          </div>
                        </div>
                      </div>
                    </li> */}
                  </ul>
                  <div className="refer-earn-info">
                    <div className="row m-0">
                      <div className="col-3 col-lg-2 d-flex align-items-center justify-content-center p-0 pe-1">
                        <img src="/bonus.PNG" alt="..." className="" />
                      </div>
                      <div className="col-9 col-lg-10 d-flex flex-column align-items-start p-0">
                        <h6 className="mb-0 pri-clr fs-13 fw-bold">
                          Refer & Earn
                        </h6>
                        <p className="mb-0 sec-clr fs-10 fw-500">
                          Give $25, Get $25 and bonus rewards as you refer more
                          people.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

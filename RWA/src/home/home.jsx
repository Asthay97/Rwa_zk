import "./home.css";
import Login from "../login/login";
import Register from "../register/register";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import abi from "../../constants/abi.json";
import { CircularProgressbar } from "react-circular-progressbar";

import { useDispatch, useSelector } from "react-redux";
import { fetchPropertyData } from "../store/thunks";

export default function Home() {
  const [login, showLogin] = useState(false);
  const [register, showRegister] = useState(false);

  const properties = useSelector((state) => state.property);
  const account = useSelector((state) => state.connected);

  // async function Data() {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   console.log("PROVider of windowwww", provider);
  //   const signer = provider.getSigner();
  //   const currentAccount = await signer.getAddress();
  //   console.log("ACCOUTN", currentAccount);
  // }
  // Data();
  console.log("Property State from  Redux inside Home Page ", properties);

  // async function fetchData() {
  //   const provider = new ethers.providers.JsonRpcProvider(
  //     "https://polygon-mumbai.g.alchemy.com/v2/KFGiZ9X78dt4jBe16IjpjVXbhlPzuSx8"
  //   );
  //   const contractAddress = "0x88803A6B977eFfD33d6D5Fc032D9666Fde1D2E04";
  //   const contract = new ethers.Contract(contractAddress, abi, provider);
  //   try {
  //     const property = await contract.getProperties();

  //     console.log("PROPERTIES", property);
  //     const propertyString = String(property);
  //     const inputPropertyArray = propertyString.split(",");

  //     const resultPropertyArray = [];

  //     for (let i = 0; i < inputPropertyArray.length; i += 8) {
  //       const obj = {
  //         propertyId: inputPropertyArray[i],
  //         owner: inputPropertyArray[i + 1],
  //         tokenName: inputPropertyArray[i + 2],
  //         tokenSymbol: inputPropertyArray[i + 3],
  //         tokenSupply: inputPropertyArray[i + 4],
  //         interestRate: inputPropertyArray[i + 5],
  //         lockingPeriod: inputPropertyArray[i + 6],
  //         status: inputPropertyArray[i + 7],
  //       };
  //       resultPropertyArray.push(obj);
  //     }

  //     console.log(resultPropertyArray);
  //     // setting state with it resultPropertyArray
  //     setProperties(resultPropertyArray);
  //   } catch (err) {
  //     console.log("Error from fetchoign dat", err);
  //   }
  // }

  // useEffect(() => {
  //   dispatch(fetchPropertyData());
  //   // fetchData();
  // }, []);

  if (login === true) {
    return <Login />;
  }
  if (register == true) {
    return <Register />;
  }

  return (
    <div>
      <head>
        <title>PROMISSORY | Home</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <nav class="navbar navbar-expand-md mx-4 my-3">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggler"
            aria-controls="navbarToggler"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand" href="#">
            <img src="/logo1.png" alt="..." />
          </a>
          <div class="collapse navbar-collapse" id="navbarToggler">
            <ul class="navbar-nav me-auto mb-2 mb-md-0 w-100 justify-content-end">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#">
                  {" "}
                  About Us{" "}
                </a>
              </li>
              <li class="nav-item">
              <Link className="nav-link" to="/dashboard">
                  Learn
                </Link>
              </li>
              <li class="nav-item">
              <Link className="nav-link" to="/kyc">
                  KYC
                </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="container-fluid w-auto home-container p-0 m-0">
        <div class="row mt-5 me-0 mb-0 ms-4">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="header-details">
              <h1 class="text-uppercase mb-1">
                Asset Guard: Real World Asset Investing
              </h1>
              <p class="text-capitalize mb-3">
                Easily invest and secure loans on real world assets 
              </p>
              <button type="button" class="btn text-uppercase promissory-btn">
                view market place
              </button>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-8 pe-0 d-flex justify-content-end">
            <img src="/home.jpeg" alt="..." class="home-img" />
          </div>
        </div>

        <div class="home-steps-details">
          <div class="steps-container mx-4 p-4">
            <h5 class="text-white fw-lighter text-center mb-1">
              Investing in real estate has never been easier
            </h5>
            <h5 class="text-white text-center mb-3">
              We Are Ready To Help You
            </h5>
            <div class="row">
              <div class="col-12 col-md-4 position-relative">
                <div class="landing-card step1-card d-flex align-items-end">
                  <div class="txt-content bg-white mx-3 px-4 d-flex flex-column justify-content-between">
                    <h6 class="text-center text-capitalize pri-clr mt-4">
                      browse assets
                    </h6>
                    <p class="text-center sec-clr fs-14">
                      View detailed financial data, inspection reports, and
                      more. All property documents are publicly available, E.g.,
                      36 Rohan Iksha
                    </p>
                  </div>
                </div>
                <div class="step-number">
                  <div class="step-count">1</div>
                  <hr class="step-hr" />
                </div>
              </div>
              <div class="col-12 col-md-4 position-relative">
                <div class="landing-card step2-card d-flex align-items-end">
                  <div class="txt-content bg-white mx-3 px-4 d-flex flex-column justify-content-between">
                    <h6 class="text-center text-capitalize pri-clr mt-4">
                      select asset
                    </h6>
                    <p class="text-center sec-clr fs-14">
                      Purchase tokens for $50 each and become a direct owner.
                      Get your first rental payment that same day.
                    </p>
                  </div>
                </div>
                <div class="step-number">
                  <div class="step-count">2</div>
                  <hr class="step-hr" />
                </div>
              </div>
              <div class="col-12 col-md-4 position-relative">
                <div class="landing-card step3-card d-flex align-items-end">
                  <div class="txt-content bg-white mx-3 px-4 d-flex flex-column justify-content-between">
                    <h6 class="text-center text-capitalize pri-clr mt-4">
                      earn appreciation & sell anytime
                    </h6>
                    <p class="text-center sec-clr fs-14">
                      Tokens appreciate on a monthly basis as the property
                      appreciates. Sell your tokens anytime. No lock-up periods.
                    </p>
                  </div>
                </div>
                <div class="step-number w-auto">
                  <div class="step-count">3</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="home-featured-properties-details pt-4 pb-5">
          <div class="featured-properties-container mx-4">
            <div class="analytics-row px-5 py-3">
              <div class="row">
                <div class="col-4">
                  <h4 class="pri-clr text-center mb-1">200</h4>
                  <h6 class="black-clr text-uppercase text-center fw-normal mb-0">
                    award winning
                  </h6>
                </div>
                <div class="col-4">
                  <h4 class="pri-clr text-center mb-1">100+</h4>
                  <h6 class="black-clr text-uppercase text-center fw-normal mb-0">
                    property read
                  </h6>
                </div>
                <div class="col-4">
                  <h4 class="pri-clr text-center mb-1">500+</h4>
                  <h6 class="black-clr text-uppercase text-center fw-normal mb-0">
                    happy customers
                  </h6>
                </div>
              </div>
            </div>

            <div class="featured-properties-row p-4">
              <h4 class="text-capitalize mb-4 text-white text-center">
                featured assets
              </h4>

              <div class="action-btns text-center mb-3">
                <div
                  class="btn-group"
                  role="group"
                  aria-label="Basic radio toggle button group"
                >
                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio1"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btnradio1">
                    machinery
                  </label>

                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio2"
                    autocomplete="off"
                    checked
                  />
                  <label class="btn btn-outline-primary mx-3" for="btnradio2">
                    real estate
                  </label>

                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio3"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-primary" for="btnradio3">
                    gold
                  </label>
                </div>
              </div>

              <div class="row mb-4">
                {properties.length > 0 &&
                  properties.slice(0, 3).map((property, index) => (
                    <div key={index} class="col-4">
                      <div class="home-analytics-card">
                        <img
                          src="/home1.jpeg"
                          alt="..."
                          class="w-100 h-100 home-img"
                        />
                        <div class="footer">
                          <div class="top-content bg-white d-flex justify-content-between p-2 m-2 mb-0">
                            <div class="content-left d-flex flex-column justify-content-center">
                              <h6 class="black-clr mb-0 fs-14 fw-semibold">
                                {`${property.propertyId} ${property.tokenSymbol}`}
                              </h6>
                              <p class="sec-clr mb-0 fs-11 fw-500">
                                {property.tokenName}
                              </p>
                            </div>
                            <div class="content-right fs-12 d-flex align-items-center">
                              <div class="d-flex flex-column align-items-end me-2">
                                <span class="irr-percent fw-500 pri-clr">
                                  {property.interestRate / 100}%
                                </span>
                                <span class="coc-percent sec-clr"> 9.9% </span>
                              </div>
                              <div class="d-flex flex-column align-items-end">
                                <span class="fw-500 pri-clr"> IRR </span>
                                <span class="sec-clr"> CoC </span>
                              </div>
                            </div>
                          </div>
                          <div class="bottom-content bg-black d-flex justify-content-between p-2 m-2 mt-0">
                            <div class="content-left d-flex align-items-center">
                              <div class="d-flex flex-column grey-clr me-1">
                                <span class="fw-500 fs-12"> $52.86 </span>
                                <span class="fw-100 fs-10"> MINIMUM </span>
                              </div>
                              <div class="bg-success increased-percent d-flex align-items-center p-1">
                                <i class="fa fa-arrow-up text-white me-1"></i>
                                <span class="text-white fs-10"> 6.36% </span>
                              </div>
                            </div>
                            <div class="content-right d-flex align-items-center">
                              <div class="d-flex flex-column align-items-end grey-clr me-1">
                                <span class="fw-500 fs-12">
                                  {(
                                    (property.tokenSupply -
                                      property.investment) /
                                    10 ** 9
                                  ).toFixed(9)}
                                </span>
                                <b>
                                  <span class="fw-100 fs-10 text-end">
                                    TOKENS LEFT
                                  </span>
                                </b>
                              </div>
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
                                {/* <img
                                  src="../assets/images/progress-left-stat.PNG"
                                  alt="..."
                                /> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                {/* <div class="col-4">
                  <div class="home-analytics-card">
                    <img
                      src="/home1.jpg"
                      alt="..."
                      class="w-100 h-100 home-img"
                    />
                    <div class="footer">
                      <div class="top-content bg-white d-flex justify-content-between p-2 m-2 mb-0">
                        <div class="content-left d-flex flex-column justify-content-center">
                          <h6 class="black-clr mb-0 fs-14 fw-semibold">
                            12507 Astor Ave
                          </h6>
                          <p class="sec-clr mb-0 fs-11 fw-500">
                            Cleveland, Ohio 44135
                          </p>
                        </div>
                        <div class="content-right fs-12 d-flex align-items-center">
                          <div class="d-flex flex-column align-items-end me-2">
                            <span class="irr-percent fw-500 pri-clr">
                              19.9%
                            </span>
                            <span class="coc-percent sec-clr"> 9.9% </span>
                          </div>
                          <div class="d-flex flex-column align-items-end">
                            <span class="fw-500 pri-clr"> IRR </span>
                            <span class="sec-clr"> CoC </span>
                          </div>
                        </div>
                      </div>
                      <div class="bottom-content bg-black d-flex justify-content-between p-2 m-2 mt-0">
                        <div class="content-left d-flex align-items-center">
                          <div class="d-flex flex-column grey-clr me-1">
                            <span class="fw-500 fs-12"> $52.86 </span>
                            <span class="fw-100 fs-10"> MINIMUM </span>
                          </div>
                          <div class="bg-success increased-percent d-flex align-items-center p-1">
                            <i class="fa fa-arrow-up text-white me-1"></i>
                            <span class="text-white fs-10"> 6.36% </span>
                          </div>
                        </div>
                        <div class="content-right d-flex align-items-center">
                          <div class="d-flex flex-column align-items-end grey-clr me-1">
                            <span class="fw-500 fs-12"> 5,636 </span>
                            <span class="fw-100 fs-10 text-end">
                              TOKENS LEFT
                            </span>
                          </div>
                          <div>
                            <img
                              src="../assets/images/progress-left-stat.PNG"
                              alt="..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="home-analytics-card">
                    <img
                      src="/home1.jpg"
                      alt="..."
                      class="w-100 h-100 home-img"
                    />
                    <div class="footer">
                      <div class="top-content bg-white d-flex justify-content-between p-2 m-2 mb-0">
                        <div class="content-left d-flex flex-column justify-content-center">
                          <h6 class="black-clr mb-0 fs-14 fw-semibold">
                            12507 Astor Ave
                          </h6>
                          <p class="sec-clr mb-0 fs-11 fw-500">
                            Cleveland, Ohio 44135
                          </p>
                        </div>
                        <div class="content-right fs-12 d-flex align-items-center">
                          <div class="d-flex flex-column align-items-end me-2">
                            <span class="irr-percent fw-500 pri-clr">
                              19.9%
                            </span>
                            <span class="coc-percent sec-clr"> 9.9% </span>
                          </div>
                          <div class="d-flex flex-column align-items-end">
                            <span class="fw-500 pri-clr"> IRR </span>
                            <span class="sec-clr"> CoC </span>
                          </div>
                        </div>
                      </div>
                      <div class="bottom-content bg-black d-flex justify-content-between p-2 m-2 mt-0">
                        <div class="content-left d-flex align-items-center">
                          <div class="d-flex flex-column grey-clr me-1">
                            <span class="fw-500 fs-12"> $52.86 </span>
                            <span class="fw-100 fs-10"> MINIMUM </span>
                          </div>
                          <div class="bg-success increased-percent d-flex align-items-center p-1">
                            <i class="fa fa-arrow-up text-white me-1"></i>
                            <span class="text-white fs-10"> 6.36% </span>
                          </div>
                        </div>
                        <div class="content-right d-flex align-items-center">
                          <div class="d-flex flex-column align-items-end grey-clr me-1">
                            <span class="fw-500 fs-12"> 5,636 </span>
                            <span class="fw-100 fs-10 text-end">
                              TOKENS LEFT
                            </span>
                          </div>
                          <div>
                            <img
                              src="../assets/images/progress-left-stat.PNG"
                              alt="..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>

              <div class="row">
                <div class="col-4 d-flex align-items-center justify-content-center">
                  <div class="view-actions">
                    <div class="view-btn disabled-btn">
                      <i class="fa fa-arrow-left text-white"></i>
                    </div>
                  </div>
                </div>
                <div class="col-4 d-flex align-items-center justify-content-center position-relative">
                  <hr class="view-hr" />
                  <button
                    type="button"
                    class="btn text-uppercase promissory-btn fs-13 view-all-btn"
                  >
                    view all assets
                  </button>
                </div>
                <div class="col-4 d-flex align-items-center justify-content-center">
                  <div class="view-actions flex-row-reverse">
                    <div class="view-btn">
                      <i class="fa fa-arrow-right text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="customer-reviews-row p-5 pb-2">
              {/* <div class="row">
                <div class="col-5"> */}
                  <div class="user-feedback-details">
                    <h4 class="pri-clr fw-400 mb-2">
                      THE BEST WAY TO INVEST IN REAL WORLD ASSETS
                    </h4>
                    <div class="user-details d-flex flex-column mb-5">
                      <span class="black-clr fw-500 fs-14">
                        {" "}
                        Made by: Astha Yadav,{" "}
                        Mohit Vashistha
                      </span>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          {/* </div>
        </div> */}
      </div>
  );
}

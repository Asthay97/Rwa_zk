import styles from "@/styles/Home.module.css";
import { Button, ButtonGroup, Spinner, Table } from "react-bootstrap";
import { Modal } from "react-bootstrap";

import { useState } from "react";

import { AtomicApi } from "@web3uikit/icons";
import { Balancer } from "@web3uikit/icons";
import { Tokens } from "@web3uikit/icons";
import { Checkmark } from "@web3uikit/icons";
import { Cross } from "@web3uikit/icons";
import { BsPercent } from "react-icons/bs";
import { MdOutlinePendingActions } from "react-icons/md";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useNotification } from "web3uikit";
import Approve from "./Approve";

import Invest from "./Invest";

import { Key } from "@web3uikit/icons";
import { AlertTriangle } from "@web3uikit/icons";

const contractAddresses = require("../constants/contractaddress.json");
const abi = require("../constants/Promissory-abi.json");

// This  component  receives props as input.
// The props parameter is an object that contains properties passed by the parent component to this component.
// The properties object is an array of objects, and each object represents a property with several attributes.

export default function ShowProperties(props) {
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState(null);
  const [type, setType] = useState(1);

  const { account } = useMoralis();

  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <Table striped bordered hover variant="dark" className="data_card">
        <thead>
          <tr>
            <th>Property ID</th>
            <th>Owner</th>
            <th>Token Name</th>
            <th>Token Symbol</th>
            <th>Token Supply</th>
            <th>Interest Rate</th>
            <th>Locking Period</th>
            {!props.isOwner && <th>Status</th>}
            {props.isOwner ? <th>Approve </th> : <th>Invest</th>}
          </tr>
        </thead>
        <tbody>
          {props.isloading ? (
            <td className="w-100 text-center p-3 m-3" colSpan={6}>
              <Spinner animation="border" variant="primary" size="lg" />
            </td>
          ) : (
            props?.properties.map((obj, index) => (
              <tr key={index}>
                <td> {obj.propertyId}</td>
                <td>{obj.owner}</td>
                <td>{obj.tokenName}</td>
                <td>{obj.tokenSymbol}</td>
                <td>
                  <div className="d-flex">
                    <span className="flex-grow-1">{obj.tokenSupply}</span>
                  </div>
                </td>
                <td>
                  <div className="d-flex">
                    <span className="flex-grow-1">{obj.interestRate}</span>
                  </div>
                </td>
                <td>
                  <div className="d-flex">
                    <span className="flex-grow-1">{obj.lockingPeriod}</span>
                  </div>
                </td>
                {!props.isOwner && (
                  <td>
                    <div>
                      {
                        {
                          1: <AlertTriangle fontSize="30px" color="red" />,
                          2: <Checkmark fontSize="20px" color="#06f73a" />,
                          3: "Banned",
                        }[obj.status]
                      }
                    </div>
                  </td>
                )}
                {props.isOwner ? (
                  <td>
                    {
                      {
                        1: (
                          <Button
                            onClick={() => {
                              setType(4);
                              setEditData(obj);
                              setShow(true);
                            }}
                          >
                            Approve
                          </Button>
                        ),
                        2: <Checkmark fontSize="20px" color="#06f73a" />,
                        3: <Cross fontSize="20px" />,
                      }[obj.status]
                    }
                  </td>
                ) : (
                  <td>
                    {account !== obj.owner.toLowerCase() && obj.status == 2 ? (
                      <Button
                        onClick={() => {
                          setType(7);
                          setEditData(obj);
                          setShow(true);
                        }}
                      >
                        Invest
                      </Button>
                    ) : account == obj.owner.toLowerCase() ? (
                      <Button>
                        <Key fontSize="20px" />
                      </Button>
                    ) : (
                      <Button>
                        <MdOutlinePendingActions
                          fontSize="20px"
                          color="red"
                        ></MdOutlinePendingActions>
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {
              {
                4: "Approve",

                7: "Invest",
              }[type]
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            {
              4: (
                <Approve
                  setModal={setShow}
                  editData={editData}
                  setRefresh={props.setRefresh}
                />
              ),

              7: (
                <Invest
                  setModal={setShow}
                  editData={editData}
                  setRefresh={props.setRefresh}
                />
              ),
            }[type]
          }
        </Modal.Body>
      </Modal>
    </>
  );
}

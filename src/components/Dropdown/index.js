import React, { useEffect, useContext } from "react";
import Popper from "popper.js";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import useDropdownStore from "../../stores/useDropdownStore";
import { BiUserCircle, BiLogOutCircle } from "react-icons/bi";
import { Web3Context } from "../../contexts/Web3Provider";
import { shortenAddress } from "../../utils/addressShortener";

const Dropdown = ({ color }) => {
  const { isOpen, closeDropdown, openDropdown } = useDropdownStore();
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end",
    });
    // setDropdownPopoverShow(true);
    openDropdown();
  };

  const { connectWallet, balance, account, disconnect } = useContext(Web3Context);

  // bg colors
  let bgColor;
  color === "white"
    ? (bgColor = "bg-control")
    : (bgColor = "bg-" + color + "-500");
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-6/12 md:w-4/12 pl-4">
          <div className="relative inline-flex align-middle w-full">
            <button
              className={
                "text-text-primary text-sm px-4 py-1 rounded-lg shadow  hover:shadow-button1 shadow hover:shadow-lg outline-none focus:outline-none " +
                bgColor
              }
              style={{ transition: "all .15s ease" }}
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                isOpen ? closeDropdown() : openDropdownPopover();
              }}
            >
              <div className="flex flex-row">
                <div className="flex flex-col items-end pr-3 pl-1">
                  <h1 className="font-bold">{balance && balance.slice(0, 5)} AVAX</h1>
                  <p>{shortenAddress(account)}</p>
                </div>
                <Avatar size="small" />
              </div>
            </button>
            <div
              ref={popoverDropdownRef}
              className={
                (isOpen ? "block " : "hidden ") +
                (color === "white" ? "bg-control " : bgColor + " ") +
                "text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-button1 shadow shadow-lg mt-1"
              }
              style={{ minWidth: "12rem" }}
            >
              <Link
                to="/profile"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent flex flex-row " +
                  (color === "white" ? "text-text-secondary" : "text-white")
                }
              >
                <BiUserCircle size={18} color="black" className="mr-2"/>
                <p className="text-text-primary">Go to my profile</p>
              </Link>
              {/* <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent " +
                  (color === "white" ? "text-text-secondary" : "text-white")
                }
                onClick={(e) => e.preventDefault()}
              >
                Another action
              </a>
              <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent " +
                  (color === "white" ? "text-text-secondary" : "text-white")
                }
                onClick={(e) => e.preventDefault()}
              >
                Something else here
              </a> */}
              {/* <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" /> */}
              {/* <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent  flex flex-row " +
                  (color === "white" ? "text-text-secondary" : "text-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  disconnect();
                }}
              >
                <BiLogOutCircle size={18} color="black" className="mr-1"/>
                <p className="text-text-primary">Disconnect</p>
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function DropdownRender() {
  return (
    <>
      <Dropdown color="white" />
    </>
  );
}

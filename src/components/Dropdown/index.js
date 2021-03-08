import React, { useEffect } from "react";
import Popper from "popper.js";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import useDropdownStore from "../../stores/useDropdownStore";
import { BiUserCircle, BiLogOutCircle } from "react-icons/bi";

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

  // bg colors
  let bgColor;
  color === "white"
    ? (bgColor = "bg-control")
    : (bgColor = "bg-" + color + "-500");
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-6/12 md:w-4/12 px-4">
          <div className="relative inline-flex align-middle w-full">
            <button
              className={
                "text-text-secondary text-sm px-4 py-1 rounded-lg shadow  hover:shadow-button1 shadow hover:shadow-lg outline-none focus:outline-none " +
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
                  <h1 className="font-bold">12 ETH</h1>
                  <p>0x432...123</p>
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
                <BiUserCircle size={18} className="mr-2"/>
                Go to my profile
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
              <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />
              <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent  flex flex-row " +
                  (color === "white" ? "text-text-secondary" : "text-white")
                }
                onClick={(e) => e.preventDefault()}
              >
                <BiLogOutCircle size={18} className="mr-1"/>
                Disconnect
              </a>
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

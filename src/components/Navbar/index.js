import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "../Dropdown";
import Button from "../Button";
import { FiMoon, FiSun } from "react-icons/fi";
import { Web3Context } from "../../contexts/Web3Provider";

function Navbar() {
  const { pathname } = useLocation();

  const { connectWallet, balance, account } = useContext(Web3Context);

  return (
    <div className="2xl:px-48 xl:px-40 lg:px-32 md:px-24 sm:px-16 px-8 bg-background">
      <div className="flex flex-row pt-6 items-center">
        <div>
          <h1 className="text-text-main text-3xl">Intangible</h1>
        </div>
        {/* Buttons and connect wallet section */}
        <div className="flex flex-row flex-1 justify-between pl-24">
          <div className="grid grid-cols-3 gap-4 flex items-center">
            <Link
              to="/"
              className={`${
                pathname === "/"
                  ? "border-b-2 border-primary text-text-main"
                  : "text-text-main"
              } tracking-wide subpixel-antialiased text-center text-lg h-8`}
            >
              Home
            </Link>
            <Link
              to="/artworks/live-auction"
              className={`${
                pathname === "/artworks/live-auction" ||
                pathname === "/artworks/reserve-not-met" ||
                pathname === "/artworks/sold"
                  ? "border-b-2 border-primary text-text-main"
                  : "text-text-main"
              } tracking-wide subpixel-antialiased text-center text-lg h-8`}
            >
              Market
            </Link>
            <Link
              to="/creators"
              className={`${
                pathname === "/creators"
                  ? "border-b-2 border-primary text-text-main"
                  : "text-text-main"
              } tracking-wide subpixel-antialiased text-center text-lg h-8`}
            >
              Discover
            </Link>
          </div>
          <div className="flex items-center justify-center h-full">
            {/* <Button
              shadow="shadow hover:shadow-button1"
              label="Connect Wallet"
              bgColor="bg-button-control"
            /> */}
            {/* <FiSun size={24} color={"white"} /> */}
            <div className="h-12">
            <Link to="/create" className="h-full flex justify-center items-center text-text-secondary rounded-lg bg-white px-4 font-bold ml-4 hover:shadow-button1 bg-primary">
              Create
            </Link>
            </div>
            {account ? (
              <Dropdown />
            ) : (
              <button
                onClick={connectWallet}
                className="bg-white py-2 px-2 ml-4 rounded-lg font-bold"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

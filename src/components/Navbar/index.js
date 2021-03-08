import React from "react";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "../Dropdown";

function Navbar() {
  const { pathname } = useLocation();

  return (
    <div className="2xl:px-48 xl:px-40 lg:px-32 md:px-24 sm:px-16 px-8 bg-background">
      <div className="flex flex-row pt-6">
        <div>
          <h1 className="text-text-primaryPale text-3xl">Intangible</h1>
        </div>
        {/* Buttons and connect wallet section */}
        <div className="flex flex-row flex-1 justify-between pl-24">
          <div className="grid grid-cols-3 gap-4">
            <Link
              to="/"
              className={`${
                pathname === "/"
                  ? "border-b-2 border-primary text-text-primary"
                  : "text-text-primaryPale"
              } tracking-wide subpixel-antialiased text-center text-lg h-8`}
            >
              Home
            </Link>
            <Link
              to="/artworks/live-auction" 
              className={`${
                pathname === "/artworks/live-auction" || pathname === "/artworks/reserve-not-met" || pathname === "/artworks/sold"
                  ? "border-b-2 border-primary text-text-primary"
                  : "text-text-primaryPale"
              } tracking-wide subpixel-antialiased text-center text-lg h-8`}
            >
              Artworks
            </Link>
            <Link
              to="/creators"
              className={`${
                pathname === "/creators"
                  ? "border-b-2 border-primary text-text-primary"
                  : "text-text-primaryPale"
              } tracking-wide subpixel-antialiased text-center text-lg h-8`}
            >
              Creators
            </Link>
          </div>
          <div className="flex items-center justify-center h-full">
            {/* <Button
              shadow="shadow hover:shadow-button1"
              label="Connect Wallet"
              bgColor="bg-button-control"
            /> */}
            <Dropdown/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

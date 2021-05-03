import React from "react";
import { FaTwitter, FaInstagram } from "react-icons/fa";

function Socials({color}) {
  return (
    <div className="flex flex-row gap-10">
      <FaTwitter color={color ? color : "white"} className="text-control text-4xl mx-2" />
      <FaInstagram color={color ? color : "white"} className="text-control text-4xl mx-2" />
    </div>
  );
}

export default Socials;

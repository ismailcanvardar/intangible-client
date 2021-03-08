import React from "react";
import { FaTwitter, FaDiscord, FaInstagram } from "react-icons/fa";

function Socials() {
  return (
    <div className="flex flex-row gap-10">
      <FaTwitter className="text-control text-4xl mx-2" />
      <FaDiscord className="text-control text-4xl mx-2" />
      <FaInstagram className="text-control text-4xl mx-2" />
    </div>
  );
}

export default Socials;

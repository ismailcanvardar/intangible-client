import React from "react";
import Socials from "../Socials";

function Footer() {
  return (
    <div className="h-screen flex justify-center items-center bg-primary flex-col gap-16 px-16">
      <h1 className="font-black text-text-secondary text-6xl md:text-9xl mb-4">
        Intangible
      </h1>
      <p className="w-full md:w-1/2 text-center text-text-secondary font-bold text-xl md:text-3xl mb-4">
        We love to hear your stories & see your artworks. Share
        your knowledge with us & improve our community...
      </p>
      <Socials />
    </div>
  );
}

export default Footer;

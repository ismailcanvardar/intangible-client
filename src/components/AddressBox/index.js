import React, { useEffect, useState } from "react";
import { BiCopyAlt } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import { shortenAddress } from "../../utils/addressShortener";

function AddressBox({ account }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    if (isCopied === false) {
      navigator.clipboard.writeText(account);
      setIsCopied(true);
    }
  };

  useEffect(() => {
    if (isCopied === true) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  return (
    <div onClick={copyToClipboard} className="cursor-pointer bg-control w-42 h-8 flex justify-around items-center rounded-lg px-4">
      <p
        value={account}
        className="text-text-secondary text-xs mr-2"
      >
        {shortenAddress(account)}
      </p>
      {isCopied === true ? <MdDone size={19} /> : <BiCopyAlt size={19} />}
    </div>
  );
}

export default AddressBox;

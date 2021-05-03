import React, { useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { shortenAddress } from "../../utils/addressShortener";
import {formatCountdown, manipulateCountdown} from "../../utils/countdownManipulation";

function AuctionInfo({ auctionData }) {
  const type = auctionData.type;
  const [countdownData, setCountdownData] = useState();
  const [tokenData, setTokenData] = useState();

  const shadowDecider = () => {
    if (type === "SCHEDULED") {
      return "shadow-button2";
    } else if (type === "COLDIE") {
      return "shadow-button3";
    }
  };

  const getTokenData = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_IPFS_API}/${auctionData.tokenDetails.ipfsHash}`
    );

    console.log(data);
    setTokenData(data);
  };

  useEffect(() => {
    getTokenData();
  }, [auctionData]);

  useEffect(() => {
    manipulateCountdown(type, auctionData, setCountdownData);
  }, [auctionData]);

  return (
    <Link
      to={`/artwork/${auctionData.tokenId}`}
      className={`w-full md:w-84 h-96 rounded-xl bg-control shadow ${shadowDecider()} flex flex-col transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer`}
    >
      <div>
        {tokenData &&
          (tokenData.fileType === "mp4" ? (
            <video muted className="rounded-t-xl w-full h-56 object-cover" autoPlay loop>
              <source
                src={`${process.env.REACT_APP_IPFS_API}/${tokenData.asset}`}
                type="video/mp4"
                className="rounded-t-xl"
              />
            </video>
          ) : (
            <img
              className="rounded-t-xl w-full h-56 object-cover"
              src={`${process.env.REACT_APP_IPFS_API}/${tokenData.asset}`}
            />
          ))}
      </div>
      <div className="px-6 py-4 bg-background">
        <h1 className="font-bold text-xl w-6/8 text-text-primary break-all">
          {
            tokenData !== undefined && tokenData.title
          }
        </h1>
        <div className="mt-4 mb-3 flex flex-row items-center">
          {/* <Avatar size="small" /> */}
          <h1 className="text-sm text-primary">{auctionData !== undefined && shortenAddress(auctionData.tokenDetails.owner)}</h1>
        </div>
      </div>
      <div
        className={`shadow-cardInner px-6 py-3 flex justify-between ${
          type === "SCHEDULED"
            ? "bg-primary"
            : type === "COLDIE"
            ? "bg-warning"
            : null
        } rounded-b-xl`}
      >
        {type === "SCHEDULED" && (
          <>
            <div>
              <h1 className="text-text-primary font-bold">Current bid</h1>
              <p className="text-sm">
                {auctionData.lastBid !== null
                  ? auctionData.lastBid.amount
                  : auctionData.minimumBid}{" "}
                AVAX
              </p>
            </div>
            <div>
              <h1 className="text-text-primary font-bold">Ending in</h1>
              {countdownData && (
                <p className="text-sm">{formatCountdown(countdownData)}</p>
              )}
            </div>
          </>
        )}
        {type === "COLDIE" && (
          <>
            <div>
              <h1 className="text-text-primary font-bold">Reserve price</h1>
              <p className="text-sm">{auctionData.reservePrice} AVAX</p>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}

export default AuctionInfo;

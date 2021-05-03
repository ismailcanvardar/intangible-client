import React, { useState, useEffect } from "react";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import axios from "axios";
import { getIpfsData } from "../../utils/getData";
import { shortenAddress } from "../../utils/addressShortener";

function CollectionInfo({ data }) {
  const [collectionData, setCollectionData] = useState();

  useEffect(() => {
    if (data !== undefined || data !== null) {
      handleData();
    }
  }, [data]);

  const handleData = async () => {
    const tokenData = await getIpfsData(data.ipfsHash);
    setCollectionData(tokenData);
  };

  return (
    <Link
      to={`/artwork/${data.tokenId}`}
      className={`w-full md:w-72 h-72 rounded-xl bg-control shadow-gif flex flex-col transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer`}
    >
      {collectionData &&
        (collectionData.fileType === "mp4" ? (
          <video
            muted
            className="rounded-t-xl h-72 h-2/3 w-auto object-cover"
            autoPlay
            loop
          >
            <source
              src={`${process.env.REACT_APP_IPFS_API}/${collectionData.asset}`}
              type="video/mp4"
              className="rounded-xl h-72 w-auto"
            />
          </video>
        ) : (
          <img
            className="rounded-t-xl w-full h-2/3 object-cover"
            src={`${process.env.REACT_APP_IPFS_API}/${collectionData.asset}`}
          />
        ))}
      <div className="rounded-b-xl px-6 py-6 bg-background">
        <h1 className="font-bold text-xl w-6/8 text-text-primary break-all">
          {collectionData && collectionData.title}
        </h1>
        <div className="mt-4 mb-3 flex flex-row items-center">
          {/* <Avatar size="small" /> */}
          <h1 className="ml-2 text-sm text-primary">@{shortenAddress(data.owner)}</h1>
        </div>
      </div>
    </Link>
  );
}

export default CollectionInfo;

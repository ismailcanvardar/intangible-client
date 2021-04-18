import React from "react";
import Avatar from "../Avatar";
import { shortenAddress } from "../../utils/addressShortener";
import { Link } from "react-router-dom";

function CreatorInfo({ creatorData }) {
  return (
    <Link
      to={`/creator/${creatorData.address}`}
      className={`w-full md:w-72 h-96 rounded-xl bg-control shadow shadow-gif flex flex-col transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer`}
    >
      {creatorData && creatorData.coverPhoto ? (
        <img
          className="rounded-t-xl w-full h-1/3 object-cover"
          src={`${process.env.REACT_APP_IPFS_API}/${creatorData.coverPhoto}`}
        />
      ) : (
        <img
          className="rounded-t-xl w-full h-1/3 object-cover"
          src="https://picsum.photos/1920/1080"
        />
      )}
      <div className="fixed h-full w-full flex top-20 left-6">
        <Avatar size="large" source={`${process.env.REACT_APP_IPFS_API}/${creatorData.profilePhoto}`}/>
      </div>
      <div className="h-full rounded-b-xl px-6 pt-12 bg-background">
        <div>
          {creatorData && creatorData.name && (
            <h1 className="mt-2 text-xl font-bold text-text-primary">
              {creatorData.name}
            </h1>
          )}
          {creatorData && creatorData.username && (
            <div className="mt-2 mb-3 flex flex-row items-center">
              <h1 className="text-sm text-primary">
                {"@" + creatorData.username}
              </h1>
            </div>
          )}
          <h1 className="text-md w-6/8 text-text-primary">
            {creatorData && shortenAddress(creatorData.address)}
          </h1>
        </div>
      </div>
    </Link>
  );
}

export default CreatorInfo;

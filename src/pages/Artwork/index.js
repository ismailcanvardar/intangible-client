import React, { useState, useEffect, useContext } from "react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import { Web3Context } from "../../contexts/Web3Provider";
import { Link, useParams } from "react-router-dom";
import { getIpfsData } from "../../utils/getData";
import { getTokenUri, getOwner } from "../../helpers/nftMethods";
import { getAuctionDetails, cancelAuction, settleAuction } from "../../helpers/auctionMethods";
import { RingLoader } from "react-spinners";
import { shortenAddress } from "../../utils/addressShortener";
import axios from "axios";
import CreateAuctionModal from "../../components/CreateAuctionModal";
import BidModal from "../../components/BidModal";
import moment from "moment";
import {formatCountdown, manipulateCountdown} from "../../utils/countdownManipulation";

const Artwork = () => {
  const { tokenId } = useParams();
  const [collectionData, setCollectionData] = useState();
  const { account, intangibleNft, intangibleAuctionHouse } = useContext(
    Web3Context
  );
  const [tokenOwner, setTokenOwner] = useState();
  const [auctionData, setAuctionData] = useState();
  const [hasAuction, setHasAuction] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bids, setBids] = useState();
  const [auctionCreator, setAuctionCreator] = useState();

  const [countdownData, setCountdownData] = useState();

  const handleData = async () => {
    const tokenUri = await getTokenUri(intangibleNft, tokenId);
    const tokenData = await getIpfsData(tokenUri);
    setCollectionData(tokenData);
  };

  const renderBids = (bids) => {
    if (bids.length === 0) {
      return (
        <div>
          <p className="text-text-primaryPale">No bids.</p>
        </div>
      )
    }
    
    return bids.map((bid) => {
      return (
        <div className="bg-input-background flex flex-row justify-between rounded-xl px-5 py-2 my-2 w-full">
          <div>
            <Link to="/" className="text-text-primary">
              From: {shortenAddress(bid.from)}
            </Link>
            <p className="text-text-primary">
              {moment(bid.createdAt).format("DD-MM-YYYY HH:mm:ss")}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-text-primaryPale text-xl font-bold">
              {bid.amount} AVAX
            </p>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    if (intangibleNft) {
      handleData();
      getAuction();
      getTokenOwner();
    }
  }, [intangibleNft]);

  useEffect(() => {
    getBids();
  }, [hasAuction, auctionData]);

  useEffect(() => {
    if (auctionData !== null && auctionData !== undefined) {
      manipulateCountdown(auctionData.type, auctionData, setCountdownData);
    }
  }, [auctionData]);

  const getBids = async () => {
    if (hasAuction === true && auctionData) {
      const { data: bidsData } = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/bids/${auctionData._id}`
      );
      console.log(bidsData);
      setBids(bidsData);
    }
  };

  const getAuction = async () => {
    const detail = await getAuctionDetails(intangibleAuctionHouse, tokenId);
    // console.log(detail[1]);
    // console.log(detail);
    if (detail[1] === "0") {
      setHasAuction(false);
    } else {
      setHasAuction(true);
      setAuctionCreator(detail[2]);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/auctions/${tokenId}`
      );
      console.log(data);
      setAuctionData(data);
    }
  };

  const getTokenOwner = async () => {
    const owner = await getOwner(intangibleNft, tokenId);
    console.log(owner);
    console.log(account);
    setTokenOwner(owner);
  };

  const handleSettling = async () => {
    settleAuction(
      intangibleAuctionHouse,
      process.env.REACT_APP_INTANGIBLE_NFT,
      tokenId,
      account
    );
  }

  const handleCancellation = async () => {
    cancelAuction(
      intangibleAuctionHouse,
      process.env.REACT_APP_INTANGIBLE_NFT,
      tokenId,
      account
    );
  }

  return (
    <Container>
      <div className="py-8">
        <div className="flex justify-center relative">
          {collectionData &&
            (collectionData.fileType === "mp4" ? (
              <video
                muted
                className="rounded-xl h-96 w-auto object-cover"
                autoPlay
                loop
              >
                <source
                  src={`${process.env.REACT_APP_IPFS_API}/${collectionData.asset}`}
                  type="video/mp4"
                  className="rounded-xl h-96 w-auto"
                />
              </video>
            ) : (
              <img
                className="rounded-xl p-4 rounded-t-xl w-auto h-screen/2 object-cover"
                src={`${process.env.REACT_APP_IPFS_API}/${collectionData.asset}`}
              />
            ))}
          <div className="absolute bottom-2 flex px-8 gap-2">
            {hasAuction === true ? (
              auctionCreator === account ? (
                <>
                  <Button
                    onClick={handleCancellation}
                    label="Cancel Auction"
                    bgColor="bg-button-primary"
                    labelColor="text-text-primary"
                  />
                  <Button
                    onClick={() => handleSettling()}
                    label="Settle Auction"
                    bgColor="bg-button-control"
                    labelColor="text-text-secondary"
                  />
                </>
              ) : (
                <Button
                  onClick={() => setShowBidModal(true)}
                  label="Make Bid"
                  bgColor="bg-button-control"
                  labelColor="text-text-secondary"
                />
              )
            ) : tokenOwner === account ? (
              <Button
                label="Start an Auction"
                onClick={() => {
                  if (hasAuction === false) {
                    setShowModal(true);
                  }
                }}
                bgColor="bg-primary"
                labelColor="text-text-primary"
              />
            ) : (
              <Button
                label={"Not for sale"}
                disabled={hasAuction === false}
                bgColor="bg-primary"
                labelColor="text-text-primaryPale"
              />
            )}
          </div>
        </div>
        <div className="divide-y">
          <div className="flex flex-col items-center py-8">
            <p className="text-text-primary text-5xl font-bold">
              {collectionData && collectionData.title}
            </p>
            <p className="text-text-primaryPale text-xl">
              {collectionData && collectionData.description}
            </p>
            <Link to="/" className="text-text-primaryPale text-sm mt-2">
              Creator:{" "}
              {collectionData && shortenAddress(collectionData.creator)}
            </Link>
            <Link to="/" className="text-text-primaryPale text-sm mt-2">
              Owner: {tokenOwner && shortenAddress(tokenOwner)}
            </Link>
            {countdownData && (
              <p className="text-xl font-bold text-text-primary mt-2">{formatCountdown(countdownData)}</p>
            )}
          </div>
          <div>
            {hasAuction === true ? (
              bids !== undefined && bids !== null ? (
                <>
                  {bids.length !== 0 && (
                    <p className="text-5xl text-text-main mt-8 font-bold">
                      Bids
                    </p>
                  )}
                  <div className="flex mt-8 items-center flex-col">
                    {renderBids(bids)}
                  </div>
                </>
              ) : (
                <div className="flex justify-center items-center mt-24">
                  <RingLoader color="tomato" size={40} />
                </div>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <CreateAuctionModal
        tokenId={tokenId}
        setShowModal={setShowModal}
        showModal={showModal}
      />
      <BidModal
        tokenId={tokenId}
        setShowModal={setShowBidModal}
        showModal={showBidModal}
      />
    </Container>
  );
};

export default Artwork;

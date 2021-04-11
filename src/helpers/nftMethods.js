import Web3 from "web3";
import { convertEtherToWei } from "./convertOperations";
import axios from "axios";

export const isWhitelisted = async (intanginleNft, creator) => {
  const result = await intanginleNft.methods.isWhitelisted(creator).call();
  return result;
};

export const mintToken = async (
  intangibleNft,
  artist,
  setMinting,
  setStatus,
  ipfsHash
) => {
  await intangibleNft.methods
    .mintToken(artist, ipfsHash)
    .send({ from: artist })
    .on("error", function (error) {
      console.log(error);
      setMinting(false);
    })
    .on("transactionHash", function (transactionHash) {
      console.log(transactionHash);
    })
    .on("receipt", function (receipt) {
      axios
        .post(`${process.env.REACT_APP_API_ENDPOINT}/tokens/create`, {
          tokenId: receipt.events.Transfer.returnValues.tokenId,
          ipfsHash,
          creator: artist,
          txnHash: receipt.events.Transfer.transactionHash,
        })
        .then(() => {
          setMinting(false);
          setStatus(true);
        })
        .catch((err) => {
          setMinting(false);
        });
    })
    .on("confirmation", function (confirmationNumber, receipt) {
      console.log(confirmationNumber);
    });
};

export const setApprovalForAll = async (
  intangibleNft,
  operator,
  from,
  setApproving,
  setStatus
) => {
  await intangibleNft.methods
    .setApprovalForAll(operator, true)
    .send({ from })
    .on("error", function (error) {
      console.log(error);
      setApproving(false);
      setStatus(false);
    })
    .on("transactionHash", function (transactionHash) {
      console.log(transactionHash);
    })
    .on("receipt", function (receipt) {
      console.log(receipt);
      console.log(receipt.events);
      setApproving(false);
      setStatus(true);
    })
    .on("confirmation", function (confirmationNumber, receipt) {
      console.log(confirmationNumber);
      console.log(receipt.events);
      setApproving(false);
      setStatus(true);
    });
};

export const isApprovedForAll = async (intangibleNft, from, operator) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await intangibleNft.methods
        .isApprovedForAll(from, operator)
        .call();
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

export const getTokenUri = async (intangibleNft, tokenId) => {
  const uri = await intangibleNft.methods.tokenURI(tokenId).call();
  return uri;
};

export const getOwner = async (intangibleNft, tokenId) => {
  const owner = await intangibleNft.methods.ownerOf(tokenId).call();
  return owner;
};

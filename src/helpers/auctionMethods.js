import Web3 from "web3";
import { convertEtherToWei, convertWeiToEth } from "./convertOperations";
import axios from "axios";

export const createColdieAuction = async (
  intangibleAuctionHouse,
  contractAddress,
  tokenId,
  reservePrice,
  lengthOfAuction,
  from,
  startingDate,
  endingDate,
  setColdieCreating,
  setColdieCreated
) => {
  setColdieCreating(true);
  await intangibleAuctionHouse.methods
    .createColdieAuction(
      contractAddress,
      tokenId,
      convertEtherToWei(reservePrice),
      lengthOfAuction
    )
    .send({ from })
    .on("error", function (error) {
      console.log(error);
      setColdieCreating(false);
    })
    .on("transactionHash", function (transactionHash) {
      console.log(transactionHash);
    })
    .on("receipt", function (receipt) {
      console.log(receipt);
      console.log(receipt.events);
      axios
        .post(
          `${process.env.REACT_APP_API_ENDPOINT}/auctions/createColdieAuction`,
          {
            tokenId,
            auctionCreator: from,
            reservePrice,
            lengthOfAuction,
            startingDate,
            endingDate,
          }
        )
        .then((data) => {
          console.log(data);
          setColdieCreating(false);
          setColdieCreated(true);
        })
        .catch((err) => console.log(err));
    })
    .on("confirmation", function (confirmationNumber, receipt) {
      console.log(confirmationNumber);
      console.log(receipt.events.TokenCreated.returnValues);
    });
};

export const cancelAuction = async (
  intangibleAuctionHouse,
  contractAddress,
  tokenId,
  from
) => {
  await intangibleAuctionHouse.methods
    .cancelAuction(contractAddress, tokenId)
    .send({ from })
    .on("error", function (error) {
      console.log(error);
    })
    .on("transactionHash", function (transactionHash) {
      console.log(transactionHash);
    })
    .on("receipt", function (receipt) {
      console.log(receipt);
      console.log(receipt.events);
      axios
        .post(
          `${process.env.REACT_APP_API_ENDPOINT}/auctions/cancelAuction`,
          {
            tokenId,
          }
        )
        .then(() => {
          window.location.reload()
        })
        .catch((err) => console.log(err));
    })
    .on("confirmation", function (confirmationNumber, receipt) {
      console.log(confirmationNumber);
      console.log(receipt.events.TokenCreated.returnValues);
    });
};

export const createScheduledAuction = async (
  intangibleAuctionHouse,
  contractAddress,
  tokenId,
  minimumBid,
  lengthOfAuction,
  startingBlock,
  from,
  starting,
  ending,
  setScheduledCreating,
  setScheduledCreated
) => {
  setScheduledCreating(true);
  await intangibleAuctionHouse.methods
    .createScheduledAuction(
      contractAddress,
      tokenId,
      convertEtherToWei(minimumBid),
      lengthOfAuction,
      startingBlock
    )
    .send({ from })
    .on("error", function (error) {
      console.log(error);
      setScheduledCreating(false);
    })
    .on("transactionHash", function (transactionHash) {
      console.log(transactionHash);
    })
    .on("receipt", function (receipt) {
      console.log(receipt);
      console.log(receipt.events);
      axios
        .post(
          `${process.env.REACT_APP_API_ENDPOINT}/auctions/createScheduledAuction`,
          {
            tokenId,
            from,
            startingBlock,
            minimumBid,
            lengthOfAuction,
            startingDate: starting,
            endingDate: ending,
          }
        )
        .then(() => {
          setScheduledCreating(false);
          setScheduledCreated(true);
        })
        .catch((err) => console.log(err));
    })
    .on("confirmation", function (confirmationNumber, receipt) {
      console.log(confirmationNumber);
      console.log(receipt.events.TokenCreated.returnValues);
    });
};

export const getAuctionDetails = async (intangibleAuctionHouse, tokenId) => {
  const detail = await intangibleAuctionHouse.methods
    .getAuctionDetails(process.env.REACT_APP_INTANGIBLE_NFT, tokenId)
    .call();
  return detail;
};

export const bid = async (
  intangibleAuctionHouse,
  contractAddress,
  amountWithFee,
  amount,
  from,
  tokenId,
  setBidOnQueue
) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/auctions/${tokenId}`
  );
  setBidOnQueue(true);
  console.log(data);
  await intangibleAuctionHouse.methods
    .bid(contractAddress, tokenId, convertEtherToWei(amount))
    .send({ from, value: convertEtherToWei(amountWithFee) })
    .on("error", function (error) {
      console.log(error);
      setBidOnQueue(false);
    })
    .on("transactionHash", function (transactionHash) {
      console.log(transactionHash);
    })
    .on("receipt", function (receipt) {
      // console.log(receipt);
      // console.log(receipt.events);
      axios
        .post(`${process.env.REACT_APP_API_ENDPOINT}/bids/placeBid`, {
          auctionId: data._id,
          from,
          amount,
          createdAt: Date.now()
        })
        .then(() => {
          console.log("saved");
          setBidOnQueue(false);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    })
    .on("confirmation", function (confirmationNumber, receipt) {
      console.log(confirmationNumber);
      console.log(receipt.events.TokenCreated.returnValues);
    });
};

export const settleAuction = async (intangibleAuctionHouse, contractAddress, tokenId, from) => {
  await intangibleAuctionHouse.methods
  .settleAuction(contractAddress, tokenId)
  .send({ from })
  .on("error", function (error) {
    console.log(error);
  })
  .on("transactionHash", function (transactionHash) {
    console.log(transactionHash);
  })
  .on("receipt", function (receipt) {
    console.log(receipt);
    console.log(receipt.events);
    axios
        .post(
          `${process.env.REACT_APP_API_ENDPOINT}/auctions/settleAuction`,
          {
            tokenId,
          }
        )
        .then(() => {
          window.location.reload()
        })
        .catch((err) => console.log(err));
  })
  .on("confirmation", function (confirmationNumber, receipt) {
    console.log(confirmationNumber);
    console.log(receipt.events.TokenCreated.returnValues);
  });
}

// export const calculateLastPrice = async (marketplaceSettings, amount) => {
//   const amountInWei = convertEtherToWei(amount);
//   let fee = await marketplaceSettings.methods.calculateMarketplaceFee(
//     amountInWei
//   );
//   fee = convertWeiToEth(fee);
//   return parseFloat(amount) + parseFloat(fee);
// };

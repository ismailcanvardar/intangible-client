import React, { useEffect, useState } from "react";
import axios from "axios";
import AuctionInfo from "../../components/AuctionInfo";
import { RingLoader } from "react-spinners";

function Sold() {
  const [loading, setLoading] = useState(true);
  const [auctions, setAuctions] = useState();

  useEffect(() => getAuctions(), []);

  const getAuctions = () => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/auctions/sold`)
      .then((res) => {
        console.log(res.data);
        setAuctions(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return loading === true ? (
    <div className="flex justify-center items-center">
      <RingLoader color="tomato" size={40} />
    </div>
  ) : (
    auctions && (
      <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {auctions.length > 0 ? (
          auctions.map((auctionData) => (
            <AuctionInfo auctionData={auctionData} />
          ))
        ) : (
          <p className="text-text-primary text-xl">No result found.</p>
        )}
      </div>
    )
  );
}

export default Sold;

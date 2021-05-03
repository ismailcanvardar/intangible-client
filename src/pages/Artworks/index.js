import React, { useEffect } from "react";
import Container from "../../components/Container";
import BottomInfo from "../../components/BottomInfo";
import { Link, useLocation, useParams } from "react-router-dom";
import Sold from "./Sold";
import ReserveNotMet from "./ReserveNotMet";
import Live from "./Live";

function Artworks() {
  const { pathname } = useLocation();
  const { type } = useParams();

  const handleSelected = () => {
    if (type === "live-auction") {
      console.log("live");
    } else if (type === "reserve-not-met") {
      console.log("reserve-not-met");
    } else if (type === "sold") {
      console.log("sold");
    }
  };

  useEffect(() => {
    console.log(type);
    console.log(pathname);
  }, [type]);

  return (
    <Container>
      <div className="h-screen">
        <div className="flex pt-12 gap-4">
          <Link
            to="/artworks/live-auction"
            className={`${
              type === "live-auction"
                ? "text-text-primary"
                : "text-text-primaryPale"
            } text-xs md:text-md lg:text-lg`}
          >
            Live auction
          </Link>
          <Link
            to="/artworks/reserve-not-met"
            className={`${
              type === "reserve-not-met"
                ? "text-text-primary"
                : "text-text-primaryPale"
            } text-xs md:text-md lg:text-lg`}
          >
            Open to Offers
          </Link>
          <Link
            to="/artworks/sold"
            className={`${
              type === "sold" ? "text-text-primary" : "text-text-primaryPale"
            } text-xs md:text-md lg:text-lg`}
          >
            Sold
          </Link>
        </div>
        <div className="h-0 my-4 border border-solid border-t-0 border-primary opacity-25" />
        {type === "live-auction" ? <Live/> : type === "reserve-not-met" ? <ReserveNotMet/> : type === "sold" ? <Sold/> : null}
      </div>
      <BottomInfo />
    </Container>
  );
}

export default Artworks;

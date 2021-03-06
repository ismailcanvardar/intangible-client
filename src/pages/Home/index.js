import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import GradientHeading from "../../components/GradientHeading";
import ReactPlayer from "react-player";
import intangibleHome from "../../assets/intangible-home.mp4";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Footer from "../../components/Footer";
import AuctionInfo from "../../components/AuctionInfo";
import CreatorInfo from "../../components/CreatorInfo";
import axios from "axios";
import { RingLoader } from "react-spinners";

function Home() {
  const [auctions, setAuctions] = useState();

  const getAuctions = () => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/auctions`)
      .then((res) => {
        setAuctions(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAuctions();
  }, [])

  return (
    <>
      <Container>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-16">
          <div className="col-span-1">
            <div className="w-full md:w-2/3">
              <GradientHeading heading="Be creative & be a part of our community." />
            </div>
            <div className="pt-6 w-full md:w-2/3">
              <p className="align-justify text-sm text-text-primaryPale">
                We will be glad to see you on our platform. Enter your email
                down below to become an intangible artist.
              </p>
            </div>
            <div className="pt-6 pb-14 md:pb-0">
              <form className="grid grid-cols-2">
                <Input placeholder="Your email" size="large" />
                <div className="ml-3">
                  <Button
                    size="large"
                    label={"Send"}
                    bgColor="bg-button-primary"
                    labelColor="text-text-secondary"
                    shadow="shadow hover:shadow-gif"
                  />
                </div>
              </form>
            </div>
          </div>
          <video
            muted
            className="w-full col-span-2 shadow-gif rounded-xl h-full w-auto object-cover"
            autoPlay
            loop
          >
            <source
              src={intangibleHome}
              type="video/mp4"
              className="rounded-xl h-96 w-auto"
            />
          </video>
        </div>
        <div className="mt-28">
          {/* LIVE AUCTIONS */}
          <div className="border-b-2 w-full border-primaryPale p-2">
            <h1 className="text-text-primary font-bold text-lg">
              <span className="relative inline-flex rounded-md shadow-sm">
                <span class="flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-button-primary opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-button-warning"></span>
                </span>
              </span>{" "}
              Live auctions
            </h1>
          </div>
          {/* FEATURED ARTWORKS */}
          <div className="flex justify-center">
            {auctions !== undefined && auctions !== null ? (
              <>
                <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {auctions.map((auctionData) => {
                    return <AuctionInfo auctionData={auctionData} />;
                  })}
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center mt-16">
                <RingLoader color="tomato" />
              </div>
            )}
          </div>
          <div className="pb-48"></div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default Home;

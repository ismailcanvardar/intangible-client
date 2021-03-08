import React from "react";
import Container from "../../components/Container";
import GradientHeading from "../../components/GradientHeading";
import ReactPlayer from "react-player";
import intangibleHome from "../../assets/intangible-home.mp4";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Footer from "../../components/Footer";
import AuctionInfo from "../../components/AuctionInfo";
import CreatorInfo from "../../components/CreatorInfo";

function Home() {
  return (
    <>
      <Container>
        {/* Slogan & Gif place */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-16">
          <div>
            <div className="w-full md:w-2/3">
              <GradientHeading heading="Be creative & be part of our community." />
            </div>
            <div className="pt-6 w-full md:w-2/3">
              <p className="align-justify text-sm text-text-primaryPale">
                We are happy to see you in our platform. Wanna be artist so fill
                this form. We will send you information email.
              </p>
            </div>
            <div className="pt-6 pb-14 md:pb-0">
              <form className="flex gap-1">
                <Input placeholder="Your email" size="large" />
                <div className="ml-3">
                  <Button
                    size="large"
                    label={"Send"}
                    bgColor="bg-button-primary"
                    labelColor="text-text-primary"
                    shadow="shadow hover:shadow-gif"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="h-full w-full shadow-gif overflow-hidden rounded-lg xl:col-span-2">
            <ReactPlayer
              url={intangibleHome}
              height="100%"
              width="100%"
              loop
              playing
            />
          </div>
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
            <div className="py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
              <AuctionInfo condition="LIVE" />
              <AuctionInfo condition="LIVE" />
              <AuctionInfo condition="LIVE" />
              <AuctionInfo condition="LIVE" />
              <AuctionInfo condition="LIVE" />
              <AuctionInfo condition="LIVE" />
            </div>
          </div>
          {/* ----------------------- */}
          <div>
            <div className="border-b-2 w-full border-primaryPale p-2">
              <h1 className="text-text-primary font-bold text-lg">
                Featured artworks
              </h1>
            </div>
          </div>
          {/* FEATURED ARTWORKS */}
          <div className="flex justify-center">
            <div className="py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
              <AuctionInfo condition="NOT_MET" />
              <AuctionInfo condition="NOT_MET" />
              <AuctionInfo condition="NOT_MET" />
              <AuctionInfo condition="NOT_MET" />
              <AuctionInfo condition="NOT_MET" />
              <AuctionInfo condition="NOT_MET" />
            </div>
          </div>
          {/* ----------------------- */}
          <div>
            <div className="border-b-2 w-full border-primaryPale p-2">
              <h1 className="text-text-primary font-bold text-lg">
                Featured creators
              </h1>
            </div>
          </div>
          {/* FEATURED ARTWORKS */}
          <div className="flex justify-center">
            <div className="py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
              <CreatorInfo />
            </div>
          </div>
          {/* ----------------------- */}
          <div className="pb-48"></div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default Home;

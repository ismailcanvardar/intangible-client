import React from "react";
import Avatar from "../../components/Avatar";
import Container from "../../components/Container";
import BottomInfo from "../../components/BottomInfo";
import AuctionInfo from "../../components/AuctionInfo";
import AddressBox from "../../components/AddressBox";

function Profile() {
  return (
    <>
      <div className="bg-background w-screen">
        <img
          className="pt-2 h-screen/3 w-full object-cover"
          src="https://picsum.photos/1920/1080"
        />
        <div className="absolute left-1/2">
          <div className="relative -left-1/2 -mt-24">
            <Avatar size="xxlarge" />
          </div>
        </div>
      </div>
      <Container>
        <div className="pt-48 flex flex-col items-center m-h-screen">
          <h1 className="text-text-primary text-3xl font-bold uppercase text-center">
            This is a name of user
          </h1>
          <h1 className="text-text-primary my-2">@thisisusername</h1>
          <AddressBox/>
          <div className="flex justify-center py-16">
            <div className="py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
              <AuctionInfo condition="NOT_MET" />
              <AuctionInfo condition="NOT_MET" />
              <AuctionInfo condition="NOT_MET" />
              <AuctionInfo condition="NOT_MET" />
              <AuctionInfo condition="NOT_MET" />
              <AuctionInfo condition="NOT_MET" />
            </div>
          </div>
        </div>
        <BottomInfo />
      </Container>
    </>
  );
}

export default Profile;

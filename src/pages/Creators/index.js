import React from "react";
import Container from "../../components/Container";
import Input from "../../components/Input";
import CreatorInfo from "../../components/CreatorInfo";
import BottomInfo from "../../components/BottomInfo";

function Creators() {
  return (
    <Container>
      <div className="flex justify-center pt-12">
        <Input size="large" placeholder="Type creator name or username" />
      </div>
      <div className="h-0 my-4 border border-solid border-t-0 border-primary opacity-25" />
      <div>
        <div className="flex justify-center">
          <div className="py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <CreatorInfo />
            <CreatorInfo />
            <CreatorInfo />
            <CreatorInfo />
            <CreatorInfo />
            <CreatorInfo />
            <CreatorInfo />
            <CreatorInfo />
          </div>
        </div>
      </div>
      <BottomInfo/>
    </Container>
  );
}

export default Creators;

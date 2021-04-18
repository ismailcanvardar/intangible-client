import React, { useEffect, useRef, useState } from "react";
import Container from "../../components/Container";
import { ImUpload } from "react-icons/im";
import Input from "../../components/Input";
import Button from "../../components/Button";
import BottomInfo from "../../components/BottomInfo";
import CreationModal from "../../components/CreationModal";

const supportedTypes = ["gif", "png", "jpg", "jpeg", "mp4"];

function CreateArtwork() {
  const fileInput = useRef();
  const [file, setFile] = useState();
  const [fileType, setFileType] = useState();
  const [buffer, setBuffer] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const selectFile = (event) => {
    const file = event.target.files[0];
    const type = file.type.split("/")[1];
    if (supportedTypes.indexOf(type) !== -1) {
      const reader1 = new FileReader();
      const reader2 = new FileReader();
      reader1.readAsDataURL(file);
      reader2.readAsArrayBuffer(file);
      reader1.onloadend = () => {
        // console.log(reader1.result);
        setFile(reader1.result);
        setFileType(type);
      };
      reader2.onloadend = () => {
        // console.log(reader2.result);
        setBuffer(reader2.result);
      };
    } else {
      console.log("Unsupported type.");
    }
  };

  useEffect(() => {
    if (
      title.length !== 0 &&
      description.length !== 0 &&
      buffer !== null &&
      buffer !== undefined
    ) {
      setDisabled(false);
    } else setDisabled(true);
  }, [title, description, buffer]);

  return (
    <Container>
      <div className="h-screen">
        <div className="flex flex-row justify-center py-24">
          <div className="rounded-lg border-gray-500 p-12 flex justify-center gap-12 shadow-button2">
            {file ? (
              <div
                className="cursor-pointer"
                onClick={() => fileInput.current.click()}
              >
                {fileType === "mp4" ? (
                  <video
                    className="rounded-xl h-72 w-auto"
                    width="750"
                    height="500"
                    autoPlay
                    loop
                    muted
                  >
                    <source src={file} type="video/mp4" />
                  </video>
                ) : (
                  <img className="rounded-xl h-72 w-auto" src={file} />
                )}
              </div>
            ) : (
              <button
                onClick={() => fileInput.current.click()}
                type="file"
                className="border border-dashed border-gray-500 focus:outline-none focus:border rounded h-72 w-72 flex flex-col gap-4 justify-center items-center"
              >
                <ImUpload className="text-gray-700" size={72} />
                <p className="px-8 text-gray-700">
                  Upload file up to 64 mb. Supported types; gif, jpg, jpeg, png,
                  mp4.
                </p>
              </button>
            )}
            <input
              ref={fileInput}
              onChange={selectFile}
              type="file"
              style={{ display: "none" }}
            />
            <div className="flex flex-col gap-2">
              <p className="text-text-primary">Title</p>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                size="large"
                placeholder="Type here..."
              />
              <p className="text-text-primary">Description</p>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                size="large"
                placeholder="Type here..."
              />
              <div className="pt-4 flex flex-col">
                <CreationModal
                  disabled={disabled}
                  setShowModal={setShowModal}
                  showModal={showModal}
                  assetCredential={{ title, description, asset: buffer, fileType }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomInfo />
    </Container>
  );
}

export default CreateArtwork;

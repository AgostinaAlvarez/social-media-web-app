import { Button } from "antd";
import React, { useState } from "react";
import UploadImageComponent from "../components/PrivateComponents/Upload/UploadImageComponent";
import axios from "axios";

const TesterScreen = () => {
  const aspectRatio = 1 / 1;
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedBlob, setCroppedBlob] = useState(null);
  /*
    setCroppedImage,
  setCroppedBlob,
    */

  const handleDelete = () => {
    setCroppedImage(null);
    setCroppedBlob(null);
  };

  const handleUploadToServer = async () => {
    if (!croppedBlob) {
      message.error("No hay imagen recortada para subir.");
      return;
    }
    const formData = new FormData();
    formData.append("file", croppedBlob.blob, croppedBlob.fileName);
    try {
      const response = await axios.post(
        "http://localhost:8002/upload/v1",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("imagen subida");
      console.log(response.data);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  return (
    <div>
      <div>Tester screen for test the backend</div>
      <UploadImageComponent
        setCroppedBlob={setCroppedBlob}
        setCroppedImage={setCroppedImage}
        aspectRatio={aspectRatio}
      >
        <Button type="primary">Subir imagen</Button>
      </UploadImageComponent>
      {croppedImage && (
        <>
          <div
            style={{
              height: "200px",
              width: "200px",
              backgroundImage: `url(${croppedImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <Button onClick={handleUploadToServer}>Subir imagen</Button>
          <Button onClick={handleDelete}>Quitar</Button>
        </>
      )}
    </div>
  );
};

export default TesterScreen;

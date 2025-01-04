import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { Button, Modal, Upload, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const UploadImageComponent = ({
  children,
  setCroppedImage,
  setCroppedBlob,
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [aspectRatio, setAspectRatio] = useState(1); // 1 para cuadrado

  const handleUpload = (file) => {
    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);
    setIsModalOpen(true);
    return false; // Evita la carga automática del archivo
  };

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const HandleCancelModal = () => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
    setImageUrl(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setFileList([]);
    setIsModalOpen(false);
  };

  const getCroppedImg = async (imageSrc, croppedAreaPixels) => {
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const previewUrl = URL.createObjectURL(blob);
        setCroppedBlob(blob); // Almacena el blob para subirlo al backend
        resolve(previewUrl);
      }, "image/jpeg");
    });
  };

  const handleCrop = async () => {
    try {
      const croppedImgUrl = await getCroppedImg(imageUrl, croppedAreaPixels);
      setCroppedImage(croppedImgUrl); // Guarda la URL para la vista previa
      HandleCancelModal();
    } catch (error) {
      console.error("Error al recortar la imagen:", error);
    }
  };

  return (
    <div>
      <div>Tester Screen</div>
      <Upload
        beforeUpload={handleUpload}
        accept="image/*"
        fileList={fileList}
        onRemove={() => {
          if (imageUrl) {
            URL.revokeObjectURL(imageUrl);
          }
          setFileList([]);
        }}
      >
        {children}
      </Upload>

      <Modal
        open={isModalOpen}
        onCancel={HandleCancelModal}
        onOk={handleCrop}
        okText="Recortar"
      >
        {imageUrl && (
          <div style={{ position: "relative", width: "100%", height: 400 }}>
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

const UploadTester = () => {
  const [croppedImage, setCroppedImage] = useState(null); // Para la vista previa
  const [croppedBlob, setCroppedBlob] = useState(null); // Para almacenar el blob recortado

  const handleUploadToServer = async () => {
    if (!croppedBlob) {
      message.error("No hay imagen recortada para subir.");
      return;
    }

    const formData = new FormData();
    formData.append("file", croppedBlob, "cropped-image.jpg");

    try {
      const response = await axios.post(
        "http://localhost:8002/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        console.log("URL de la imagen:", response.data.url);
        setCroppedImage(null); // Limpia la vista previa después de subir
        setCroppedBlob(null); // Limpia el blob después de subir
      } else {
        message.error("Error al subir la imagen.");
      }
    } catch (error) {
      console.log(error);
      message.error("Ocurrió un error al intentar subir la imagen.");
    }
  };

  return (
    <>
      <div>Upload tester</div>
      <UploadImageComponent
        setCroppedImage={setCroppedImage}
        setCroppedBlob={setCroppedBlob}
      >
        <Button icon={<UploadOutlined />}>Subir Imagen desde el father</Button>
      </UploadImageComponent>
      {croppedImage && (
        <>
          <div>Preview desde el padre</div>
          <div
            style={{
              width: "300px",
              height: "300px",
              marginTop: "20px",
              border: "1px solid red",
              backgroundImage: `url(${croppedImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <Button
            type="primary"
            style={{ marginTop: "10px" }}
            onClick={handleUploadToServer}
          >
            Subir
          </Button>
        </>
      )}
    </>
  );
};

export default UploadTester;

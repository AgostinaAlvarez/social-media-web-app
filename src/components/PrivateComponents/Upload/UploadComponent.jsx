import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { Button, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const UploadComponent = ({ children, aspect }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [fileList, setFileList] = useState([]);
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

  // Función para obtener la imagen recortada
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
      canvas.toBlob((blob) => resolve(blob), "image/jpeg");
    });
  };

  // Función para manejar el envío de la imagen
  const handleCrop = async () => {
    try {
      const croppedBlob = await getCroppedImg(imageUrl, croppedAreaPixels);
      const formData = new FormData();
      formData.append("file", croppedBlob, "cropped-image.jpg");

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
        console.log("Imagen subida exitosamente:", response.data.url);
        HandleCancelModal();
      } else {
        console.error("Error al subir la imagen:", response.data.message);
      }
    } catch (error) {
      console.error("Error al recortar o subir la imagen:", error);
    }
  };
  return (
    <>
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
        {/*<Button icon={<UploadOutlined />}>Subir Imagen</Button>*/}
        {children}
      </Upload>
      <Modal
        open={isModalOpen}
        onCancel={HandleCancelModal}
        onOk={handleCrop}
        okText="Recortar y Subir"
      >
        {imageUrl && (
          <div style={{ position: "relative", width: "100%", height: 400 }}>
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              aspect={aspect} // imagen cuadrada 1/1 - imagen rectangural 25/9
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
        )}
      </Modal>
    </>
  );
};

export default UploadComponent;

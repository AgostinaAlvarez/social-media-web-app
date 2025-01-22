import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { Modal, Upload } from "antd";
import AntdPrimaryBtnComponent from "../../BasicComponents/AntdPrimaryBtnComponent";
import { useTheme } from "../../../context/ThemeContext";
import AntdSecondaryBtnComponent from "../../BasicComponents/AntdSecondaryBtnComponent";

const UploadImageComponent = ({
  children,
  setCroppedImage,
  setCroppedBlob,
  aspectRatio,
}) => {
  const { theme } = useTheme();

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
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const fileType = blob.type.split("/")[1]; // Extrae el tipo de archivo (png, jpeg, etc.)
            const fileName = `cropped-image.${fileType}`; // Genera un nombre con la extensión correcta
            setCroppedBlob(blob); // Almacena el blob para subirlo al backend
            resolve({ blob, fileName }); // Devuelve el blob y el nombre generado
          } else {
            resolve(null);
          }
        },
        "image/jpeg" // Este es el formato por defecto si no se especifica otro
      );
    });
  };

  const handleCrop = async () => {
    try {
      const croppedData = await getCroppedImg(imageUrl, croppedAreaPixels);
      if (croppedData) {
        const { blob, fileName } = croppedData;
        const croppedImgUrl = URL.createObjectURL(blob);
        setCroppedImage(croppedImgUrl); // Guarda la URL para la vista previa
        setCroppedBlob({ blob, fileName }); // Guarda también el nombre generado
      }
      HandleCancelModal();
    } catch (error) {
      console.error("Error al recortar la imagen:", error);
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
        {children}
      </Upload>

      <Modal
        open={isModalOpen}
        onCancel={HandleCancelModal}
        onOk={handleCrop}
        //okText="Recortar"

        footer={
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              boxSizing: "border-box",
              gap: 10,
            }}
          >
            <AntdSecondaryBtnComponent
              label={"Cancel"}
              theme={theme}
              onClick={HandleCancelModal}
            />
            <AntdPrimaryBtnComponent
              label={"Cut"}
              theme={theme}
              onClick={handleCrop}
            />
          </div>
        }
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
    </>
  );
};

export default UploadImageComponent;

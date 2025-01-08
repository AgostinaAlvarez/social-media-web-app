import { createContext, useContext, useState } from "react";

const ImageCropContext = createContext();

// This context is to handle non-serializable data (Blob)

export const ImageCropProvider = ({ children }) => {
  const [croppedImageFrontPage, setCroppedImageFrontPage] = useState(null);
  const [croppedBlobFrontPage, setCroppedBlobFrontPage] = useState(null);

  const [croppedImageAvatar, setCroppedImageAvatar] = useState(null);
  const [croppedBlobAvatar, setCroppedBlobAvatar] = useState(null);
  return (
    <ImageCropContext.Provider
      value={{
        croppedImageFrontPage,
        setCroppedImageFrontPage,
        croppedBlobFrontPage,
        setCroppedBlobFrontPage,
        croppedImageAvatar,
        setCroppedImageAvatar,
        croppedBlobAvatar,
        setCroppedBlobAvatar,
      }}
    >
      {children}
    </ImageCropContext.Provider>
  );
};

export const useImageCrop = () => useContext(ImageCropContext);

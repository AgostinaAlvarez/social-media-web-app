import axios from "axios";

export const uploadImageToServer = async (croppedBlob) => {
  if (!croppedBlob) {
    message.error("No hay imagen recortada para subir.");
    return;
  }

  const formData = new FormData();
  formData.append("file", croppedBlob.blob, croppedBlob.fileName);

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
      return { data: response.data.url, error: null };
    } else {
      console.log("Error al subir la imagen.");
      return { data: null, error: "error" };
    }
  } catch (error) {
    console.log(error);
    return { data: null, error: error };
  }
};

export const uploadAvatarImage = async (croppedBlob, token) => {
  if (!croppedBlob) {
    message.error("No hay imagen recortada para subir.");
    return;
  }
  const formData = new FormData();
  formData.append("file", croppedBlob.blob, croppedBlob.fileName);
  try {
    const response = await axios.post(
      "http://localhost:8002/upload/avatar_img",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

export const uploadFrontPageImage = async (croppedBlob, token) => {
  if (!croppedBlob) {
    message.error("No hay imagen recortada para subir.");
    return;
  }
  const formData = new FormData();
  formData.append("file", croppedBlob.blob, croppedBlob.fileName);
  try {
    const response = await axios.post(
      "http://localhost:8002/upload/front_page_img",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

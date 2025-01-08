import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import "../../styles/presignup.css";
import { LuImagePlus } from "react-icons/lu";
import UploadImageComponent from "../PrivateComponents/Upload/UploadImageComponent";
import { BiTrash } from "react-icons/bi";
import axios from "axios";
import { Button, ConfigProvider } from "antd";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import {
  uploadAvatarImage,
  uploadFrontPageImage,
} from "../../data/api/uploadApi";

const SignupAvatarStep = ({ HandleFinishSteps }) => {
  const theme = "light";

  const preSignupData = useSelector(
    (state) => state.preSignupSlice.preSignupData
  );

  const [croppedImageFrontPage, setCroppedImageFrontPage] = useState(null); // Para la vista previa
  const [croppedBlobFrontPage, setCroppedBlobFrontPage] = useState(null); // Para almacenar el blob recortado
  const deleteFrontPageImg = () => {
    setCroppedImageFrontPage(null); // Limpia la vista previa
    setCroppedBlobFrontPage(null); // Limpia el blob
  };

  const [croppedImageAvatar, setCroppedImageAvatar] = useState(null); // Para la vista previa
  const [croppedBlobAvatar, setCroppedBlobAvatar] = useState(null); // Para almacenar el blob recortado
  const deleteAvatarImg = () => {
    setCroppedImageAvatar(null);
    setCroppedBlobAvatar(null);
  };

  const [bio, setBio] = useState("");
  const maxLength = 160;

  const handleSubmit = async () => {
    const token = preSignupData.token;
    //imagen de portada
    if (croppedImageFrontPage) {
      const { error } = await uploadFrontPageImage(croppedBlobFrontPage, token);
      if (error) {
        console.log("ocurrio un error al actualizar la foto de perfil");
      }
    }
    //imagen de perfil
    if (croppedImageAvatar) {
      const { error } = await uploadAvatarImage(croppedBlobAvatar, token);
      if (error) {
        console.log("ocurrio un error al actualizar la foto de portada");
      }
    }

    handleUpdateData({ description: bio }, token);
  };

  const handleUpdateData = async (data, token) => {
    try {
      const response = await axios.put(
        "http://localhost:8002/profile/edit",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      HandleFinishSteps(response.data.user, token);
    } catch (error) {
      console.log("error al intentar editar el profile");
      //mandar un mensaje que ocurrio un error
    }
  };

  return (
    <form className="presignup-form">
      <div
        className="presignup-form-avatar-container"
        style={
          croppedImageFrontPage
            ? {
                backgroundImage: `url(${croppedImageFrontPage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        <div className="presignup-form-avatar-front-page-icons-container">
          <UploadImageComponent
            setCroppedImage={setCroppedImageFrontPage}
            setCroppedBlob={setCroppedBlobFrontPage}
            aspectRatio={25 / 9}
          >
            <div className="presignup-form-avatar-overlay-icon ">
              <MdModeEdit />
            </div>
          </UploadImageComponent>
          {croppedImageFrontPage ? (
            <div
              className="presignup-form-avatar-overlay-icon"
              onClick={deleteFrontPageImg}
            >
              <BiTrash />
            </div>
          ) : (
            <></>
          )}
        </div>

        <div
          className="presignup-form-avatar"
          style={
            croppedImageAvatar
              ? {
                  backgroundImage: `url(${croppedImageAvatar})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : { backgroundColor: "#A294F9" }
          }
        >
          {croppedImageAvatar ? (
            <div className="presignup-form-avatar-overlay presignup-form-avatar-overlay-delete">
              <div
                className="presignup-form-avatar-overlay-icon presignup-form-avatar-overlay-icon-delete"
                onClick={deleteAvatarImg}
              >
                <BiTrash />
              </div>
            </div>
          ) : (
            <>
              <span style={{ fontSize: 65, color: "white" }}>A</span>
              <UploadImageComponent
                setCroppedImage={setCroppedImageAvatar}
                setCroppedBlob={setCroppedBlobAvatar}
                aspectRatio={1 / 1}
              >
                <div className="presignup-form-avatar-overlay">
                  <div className="presignup-form-avatar-overlay-icon">
                    <LuImagePlus />
                  </div>
                </div>
              </UploadImageComponent>
            </>
          )}
        </div>
      </div>
      <div className="presignup-form-avatar-userdata-container">
        <span className="info-name-lbl">
          {preSignupData?.name || ""} {preSignupData?.lastname || ""}
        </span>
        <span className="info-username-lbl">
          @{preSignupData?.username || ""}
        </span>
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: "100%",
        }}
      >
        <TextField
          id="bio-input"
          label="Bio"
          multiline
          rows={3}
          variant="outlined"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          inputProps={{ maxLength }}
          sx={{
            "& .MuiOutlinedInput-root": {
              fontSize: "16px", // Tamaño del texto del input
            },
          }}
          fullWidth
        />
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            color: "gray",
            fontSize: "12px",
          }}
        >
          {`${bio.length} / ${maxLength}`}
        </Typography>
      </Box>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              borderColorDisabled: theme === "dark" ? "#244a6d" : "#bfe0fc",
            },
          },
          token: {
            colorBgContainerDisabled: theme === "dark" ? "#244a6d" : "#bfe0fc",
            colorTextDisabled: theme === "dark" ? "#4b5e6f" : "#e0f0fe",
          },
        }}
      >
        <Button onClick={handleSubmit}>View Data</Button>
        {/*
          <Button
            //loading={loading ? true : false}
            //disabled={!isValid ? true : false}
            
            htmlType="submit"
            type="primary"
            style={{ width: "100%", height: 50, marginTop: 10 }}
          >
            Save changes
          </Button>
          
          */}
      </ConfigProvider>
    </form>
  );
};

export default SignupAvatarStep;

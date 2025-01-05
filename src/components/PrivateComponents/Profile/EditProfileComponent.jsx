import { Button, DatePicker, Image, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { LuAtSign } from "react-icons/lu";
import { LuImagePlus } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import UploadImageComponent from "../Upload/UploadImageComponent";
import {
  setBirthday,
  setCroppedBlobAvatar,
  setCroppedBlobFrontPage,
  setCroppedImageAvatar,
  setCroppedImageFrontPage,
  setDescription,
  setLastname,
  setName,
  setUsername,
} from "../../../slice/editProfileSlice";
import dayjs from "dayjs";
import { FaRegCircleCheck } from "react-icons/fa6";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { validateUsername } from "../../../data/api/signupApi";
import { FaRegCircleXmark } from "react-icons/fa6";
import { uploadImageToServer } from "../../../data/api/uploadApi";
import { editProfile } from "../../../data/api/profileApi";

const EditProfileComponent = () => {
  const userData = useSelector((state) => state.userSlice.userData);
  const token = useSelector((state) => state.authSlice.token);
  const dispatch = useDispatch();

  // Obtener el estado de Redux
  const croppedImageFrontPage = useSelector(
    (state) => state.editProfileSlice.croppedImageFrontPage
  );
  const croppedBlobFrontPage = useSelector(
    (state) => state.editProfileSlice.croppedBlobFrontPage
  );
  const croppedImageAvatar = useSelector(
    (state) => state.editProfileSlice.croppedImageAvatar
  );
  const croppedBlobAvatar = useSelector(
    (state) => state.editProfileSlice.croppedBlobAvatar
  );

  // Cambiar el estado en Redux cuando se actualiza la imagen
  const handleSetCroppedImageFrontPage = (image) => {
    dispatch(setCroppedImageFrontPage(image));
  };

  const handleSetCroppedBlobFrontPage = (blob) => {
    dispatch(setCroppedBlobFrontPage(blob));
  };

  const handleSetCroppedImageAvatar = (image) => {
    dispatch(setCroppedImageAvatar(image));
  };

  const handleSetCroppedBlobAvatar = (blob) => {
    dispatch(setCroppedBlobAvatar(blob));
  };

  ///Data of form

  const name = useSelector((state) => state.editProfileSlice.name);
  const lastname = useSelector((state) => state.editProfileSlice.lastname);
  const username = useSelector((state) => state.editProfileSlice.username);
  const description = useSelector(
    (state) => state.editProfileSlice.description
  );

  const birthday = useSelector((state) => state.editProfileSlice.birthday);

  const transform_birthday_value = (birthday) => {
    const birthdayValue = dayjs(birthday);
    return birthdayValue;
  };

  const [usernameAvailability, setUsernameAvailability] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username || username.trim() === "") {
      setError(true);
      return;
    }
    const timeoutId = setTimeout(() => {
      const searchUsername = async () => {
        setError(null);
        if (username === userData.username) {
          setUsernameAvailability(null);
        } else {
          const { data: response, error: response_error } =
            await validateUsername({ username: username });
          if (response) {
            setUsernameAvailability(response.available);
          } else {
            console.log("error");
            setError(true);
          }
        }
      };
      searchUsername();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [username]);

  const HandleSubmit = async () => {
    //identificar si existen fotos para subir
    /*
    const { front_page_img, avatar_img } =
      await HandleUploadProfileBannerImages(
        croppedImageAvatar,
        croppedBlobAvatar,
        croppedImageFrontPage,
        croppedBlobFrontPage
      );
      */
    //manejar el cambio de username
    //manejar la edicion de los datos
    //await HandleEditProfile(token, name, lastname, description)
  };

  const HandleUploadProfileBannerImages = async (
    croppedImageAvatar,
    croppedBlobAvatar,
    croppedImageFrontPage,
    croppedBlobFrontPage
  ) => {
    let front_page_img = "";
    let avatar_img = "";

    if (croppedImageAvatar) {
      const { data, error } = await uploadImageToServer(croppedBlobAvatar);
      if (data) {
        avatar_img = data;
      }
    }
    if (croppedImageFrontPage) {
      const { data, error } = await uploadImageToServer(croppedBlobFrontPage);
      if (data) {
        front_page_img = data;
      }
    }

    return { front_page_img, avatar_img };
  };

  const HandleChangeUsername = async (currentUsername, username) => {
    //let currentUsername = userData.username
    if (username !== currentUsername) {
      //actualizar el nombre de usuario
    }
  };

  const HandleEditProfile = async (token, name, lastname, description) => {
    const data = { name, lastname, description };
    const { data: response, error } = await editProfile(token, data);
    if (response) {
      console.log("datos actualizados");
      console.log(response);
    } else {
      console.log("algo salio mal al actualizar los datos");
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="edit-profile-acount-component-header"
        style={
          croppedImageFrontPage === ""
            ? { backgroundColor: "#d7d7d7" }
            : {
                backgroundImage: `url(${croppedImageFrontPage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
        }
      >
        <UploadImageComponent
          setCroppedImage={handleSetCroppedImageFrontPage}
          setCroppedBlob={handleSetCroppedBlobFrontPage}
          aspectRatio={25 / 9}
        >
          <div className="edit-profile-acount-component-header-edit-container">
            <MdModeEdit />
          </div>
        </UploadImageComponent>
        <div
          className="edit-profile-acount-component-header-avatar"
          style={
            croppedImageAvatar === ""
              ? { backgroundColor: "red" }
              : {
                  backgroundImage: `url(${croppedImageAvatar})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
          }
        >
          {croppedImageAvatar === "" ? (
            <UploadImageComponent
              setCroppedImage={handleSetCroppedImageAvatar}
              setCroppedBlob={handleSetCroppedBlobAvatar}
              aspectRatio={1 / 1}
            >
              <div className="edit-profile-acount-component-header-avatar-icon-container">
                <LuImagePlus />
              </div>
            </UploadImageComponent>
          ) : (
            <UploadImageComponent
              setCroppedImage={handleSetCroppedImageAvatar}
              setCroppedBlob={handleSetCroppedBlobAvatar}
              aspectRatio={1 / 1}
            >
              <div
                className="edit-profile-acount-component-header-avatar-icon-container"
                style={{ position: "absolute", top: -5, right: -5 }}
              >
                <MdModeEdit />
              </div>
            </UploadImageComponent>
          )}
        </div>
      </div>
      <form className="edit-profile-acount-component-form">
        <div className="edit-profile-acount-component-form-grid">
          <div>
            <span>Name</span>
            <Input
              value={name}
              onChange={(e) => {
                dispatch(setName(e.target.value));
              }}
            />
          </div>
          <div>
            <span>LastName</span>
            <Input
              value={lastname}
              onChange={(e) => {
                dispatch(setLastname(e.target.value));
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>Birthday</span>
          <DatePicker
            value={transform_birthday_value(birthday)}
            onChange={(date, dateString) => {
              // Convertirlo en el formato deseado
              const formattedDate = dayjs(dateString)
                .startOf("day")
                .toISOString();

              dispatch(setBirthday(formattedDate));
            }}
          />
        </div>
        <div>
          <span>Username</span>
          <Input
            prefix={<LuAtSign />}
            suffix={
              error ? (
                <ErrorRoundedIcon />
              ) : (
                <>
                  {usernameAvailability !== null ? (
                    <>
                      {usernameAvailability === true ? (
                        <FaRegCircleCheck />
                      ) : (
                        <FaRegCircleXmark />
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )
            }
            value={username}
            onChange={(e) => {
              dispatch(setUsername(e.target.value));
            }}
          />
          <span className="edit-profile-acount-component-form-lbl">
            Aviable change in 25/02/2025
          </span>
        </div>
        <div>
          <span>About me</span>
          <TextArea
            value={description}
            onChange={(e) => {
              dispatch(setDescription(e.target.value));
            }}
          />
        </div>
        <div className="edit-profile-acount-component-form-btn-container">
          <Button type="primary">Save Changes</Button>
        </div>
      </form>
    </>
  );
};

export default EditProfileComponent;

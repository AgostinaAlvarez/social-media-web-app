import { Button, ConfigProvider, DatePicker, Image, Input, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { LuAtSign } from "react-icons/lu";
import { LuImagePlus } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import UploadImageComponent from "../Upload/UploadImageComponent";
import {
  setBirthday,
  setDescription,
  setLastname,
  setName,
  setUsername,
} from "../../../slice/editProfileSlice";
import dayjs from "dayjs";
import { FaRegCircleCheck } from "react-icons/fa6";
import { validateUsername } from "../../../data/api/signupApi";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useImageCrop } from "../../../context/ImageCropContext";
import { BiTrash } from "react-icons/bi";
import axios from "axios";
import { useTheme } from "../../../context/ThemeContext";
import { setUserData } from "../../../slice/userSlice";
import { setUsernameNextModificationDate } from "../../../slice/acountSettingsSlice";
import { message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AntdInputComponent from "../../BasicComponents/AntdInputComponent";
import {
  form_theme_config,
  search_theme_config,
} from "../../../data/utils/inputThemes";
import AntdTextAreaComponent from "../../BasicComponents/AntdTextAreaComponent";
import AntdDatepickerComponent from "../../BasicComponents/AntdDatepickerComponent";
import AntdPrimaryBtnComponent from "../../BasicComponents/AntdPrimaryBtnComponent";

const EditProfileComponent = ({ handleClose }) => {
  const { theme } = useTheme();

  const userData = useSelector((state) => state.userSlice.userData);
  const token = useSelector((state) => state.authSlice.token);
  const nexModificationDate = useSelector(
    (state) => state.acountSettingsSlice.usernameNextModificationDate
  );

  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  //////
  //images data
  const {
    croppedImageFrontPage,
    setCroppedImageFrontPage,
    croppedBlobFrontPage,
    setCroppedBlobFrontPage,
    croppedImageAvatar,
    setCroppedImageAvatar,
    croppedBlobAvatar,
    setCroppedBlobAvatar,
  } = useImageCrop();

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

  useEffect(() => {
    setIsValid(false);

    if (!username || username.trim() === "") {
      setError(true);
      setIsValid(false);
      return;
    }
    const timeoutId = setTimeout(() => {
      const searchUsername = async () => {
        setError(null);
        if (username === userData.username) {
          setUsernameAvailability(null);
          setIsValid(true);
        } else {
          const { data: response, error: response_error } =
            await validateUsername({ username: username });
          if (response) {
            setIsValid(response.available);
            setUsernameAvailability(response.available);
          } else {
            console.log("error");
            setError(true);
            setIsValid(false);
          }
        }
      };
      searchUsername();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [username]);

  const HandleSubmit = async () => {
    //cambiar imagen de perfil
    setLoading(true);

    const { data: response_edit_profile, error: error_edit_profile } =
      await HandleEditProfile();

    if (response_edit_profile) {
      let new_username = response_edit_profile.user.username;

      if (username !== userData.username) {
        const { data: response_change_username, error: error_change_username } =
          await HandleChangeUserName(token, { username });
        if (response_change_username) {
          new_username = username;
          dispatch(
            setUsernameNextModificationDate(
              response_change_username.nextModificationDate
            )
          );
        } else {
          new_username = userData.username;
          console.log(
            "ocurrio un error al intentar cambiar el nombre de usuario"
          );
          console.log(error_change_username);
        }
      }
      const update_user = {
        ...response_edit_profile.user,
        username: new_username,
      };

      dispatch(setUserData(update_user));

      setTimeout(() => {
        setLoading(false);
        message.success("Profile updated");
      }, 2000);
      /*
      setTimeout(() => {
        handleClose();
      }, 3500);
      */
    } else {
      console.log("ocurrio un error al actualizar la data");
      console.log(error_edit_profile);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const HandleEditProfile = async () => {
    const formData = new FormData();

    let frontPageImageStatus = null;
    let avatarImageStatus = null;

    if (croppedImageAvatar !== userData.avatar_img) {
      if (croppedBlobAvatar) {
        avatarImageStatus = "update";
        formData.append(
          "avatar_img",
          croppedBlobAvatar.blob,
          croppedBlobAvatar.fileName
        );
      } else {
        avatarImageStatus = "delete";
      }
    }

    if (croppedImageFrontPage !== userData.front_page_img) {
      if (croppedBlobFrontPage) {
        frontPageImageStatus = "update";
        formData.append(
          "front_page_img",
          croppedBlobFrontPage.blob,
          croppedBlobFrontPage.fileName
        );
      } else {
        frontPageImageStatus = "delete";
      }
    }

    formData.append("frontPageImageStatus", frontPageImageStatus);
    formData.append("avatarImageStatus", avatarImageStatus);
    formData.append(
      "updates",
      JSON.stringify({
        name,
        lastname,
        description,
      })
    );

    try {
      const response = await axios.put(
        "http://localhost:8002/profile/edit-profile",
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

  const HandleChangeUserName = async (token, data) => {
    ///handle change username
    try {
      const response = await axios.put(
        "http://localhost:8002/user/change-username",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error };
    }
  };

  useEffect(() => {
    console.log("ver proxima actualizacion");
    console.log(nexModificationDate);
  }, []);

  const HandleUsernameAviableChange = (nexModificationDate) => {
    if (nexModificationDate) {
      const date = new Date();
      const auditFitNextModificationDate = new Date(nexModificationDate);

      if (date <= auditFitNextModificationDate) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        {loading && (
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              backgroundColor: "#ffffff6b",
              zIndex: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spin indicator={<LoadingOutlined spin />} />
          </div>
        )}
        <div
          className="edit-profile-acount-component-header"
          style={
            croppedImageFrontPage === "" || croppedImageFrontPage === null
              ? { backgroundColor: "red" }
              : {
                  backgroundImage: `url(${croppedImageFrontPage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
          }
        >
          <>
            <UploadImageComponent
              setCroppedImage={setCroppedImageFrontPage}
              setCroppedBlob={setCroppedBlobFrontPage}
              aspectRatio={25 / 9}
            >
              <div className="edit-profile-acount-component-header-edit-container">
                <MdModeEdit />
              </div>
            </UploadImageComponent>
            <div
              className="edit-profile-acount-component-header-edit-container"
              onClick={() => {
                setCroppedImageFrontPage(null);
                setCroppedBlobFrontPage(null);
              }}
            >
              <BiTrash />
            </div>
          </>
          <div
            className="edit-profile-acount-component-header-avatar"
            style={
              croppedImageAvatar === "" || croppedImageAvatar === null
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
                setCroppedImage={setCroppedImageAvatar}
                setCroppedBlob={setCroppedBlobAvatar}
                aspectRatio={1 / 1}
              >
                <div className="edit-profile-acount-component-header-avatar-icon-container">
                  <LuImagePlus />
                </div>
              </UploadImageComponent>
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  gap: 5,
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "absolute",
                  top: -10,
                  right: 0,
                }}
              >
                <UploadImageComponent
                  setCroppedImage={setCroppedImageAvatar}
                  setCroppedBlob={setCroppedBlobAvatar}
                  aspectRatio={1 / 1}
                >
                  <div className="edit-profile-acount-component-header-avatar-icon-container">
                    <MdModeEdit />
                  </div>
                </UploadImageComponent>
                <div
                  className="edit-profile-acount-component-header-avatar-icon-container"
                  onClick={() => {
                    setCroppedImageAvatar(null);
                    setCroppedBlobAvatar(null);
                  }}
                >
                  <BiTrash />
                </div>
              </div>
            )}
          </div>
        </div>
        <form className="edit-profile-acount-component-form">
          <div className="edit-profile-acount-component-form-grid">
            <div>
              <span>Name</span>
              <AntdInputComponent
                theme={theme}
                theme_config={form_theme_config}
                value={name}
                onChange={(e) => {
                  dispatch(setName(e.target.value));
                }}
              />
            </div>
            <div>
              <span>LastName</span>
              <AntdInputComponent
                theme={theme}
                theme_config={form_theme_config}
                value={lastname}
                onChange={(e) => {
                  dispatch(setLastname(e.target.value));
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>Birthday</span>
            <AntdDatepickerComponent
              value={transform_birthday_value(birthday)}
              onChange={(date, dateString) => {
                // Convertirlo en el formato deseado
                const formattedDate = dayjs(dateString)
                  .startOf("day")
                  .toISOString();

                dispatch(setBirthday(formattedDate));
              }}
              theme={theme}
              theme_config={form_theme_config}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>Username</span>
            <AntdInputComponent
              theme={theme}
              theme_config={form_theme_config}
              value={username}
              onChange={(e) => {
                dispatch(setUsername(e.target.value));
              }}
              disabled={!HandleUsernameAviableChange(nexModificationDate)}
              prefix={<LuAtSign />}
              sufix={
                error ? (
                  <ErrorRoundedIcon style={{ color: "#FFC145" }} />
                ) : (
                  <>
                    {usernameAvailability !== null ? (
                      <>
                        {usernameAvailability === true ? (
                          <CheckCircleRoundedIcon style={{ color: "green" }} />
                        ) : (
                          <ErrorRoundedIcon style={{ color: "red" }} />
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )
              }
            />

            {/*
              
              <Input
                disabled={!HandleUsernameAviableChange(nexModificationDate)}
                prefix={<LuAtSign />}
                suffix={
                  error ? (
                    <ErrorRoundedIcon style={{ color: "#FFC145" }} />
                  ) : (
                    <>
                      {usernameAvailability !== null ? (
                        <>
                          {usernameAvailability === true ? (
                            <CheckCircleRoundedIcon style={{ color: "green" }} />
                          ) : (
                            <ErrorRoundedIcon style={{ color: "red" }} />
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
              */}
            {nexModificationDate ? (
              <span className="edit-profile-acount-component-form-lbl">
                Aviable change in {nexModificationDate}
              </span>
            ) : (
              <></>
            )}
          </div>
          <div>
            <span>About me</span>
            <AntdTextAreaComponent
              value={description}
              onChange={(e) => {
                dispatch(setDescription(e.target.value));
              }}
              theme={theme}
              theme_config={form_theme_config}
            />
          </div>
          <div className="edit-profile-acount-component-form-btn-container">
            <AntdPrimaryBtnComponent
              label={"Save Changes"}
              theme={theme}
              onClick={HandleSubmit}
              disabled={!isValid}
              loading={loading}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfileComponent;

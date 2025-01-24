import { Avatar, Button, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { LuAtSign } from "react-icons/lu";
import { LuImagePlus } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import UploadImageComponent from "../Upload/UploadImageComponent";
import { validateUsername } from "../../../data/api/signupApi";
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
import { form_theme_config } from "../../../data/utils/inputThemes";
import AntdTextAreaComponent from "../../BasicComponents/AntdTextAreaComponent";
import AntdDatepickerComponent from "../../BasicComponents/AntdDatepickerComponent";
import AntdPrimaryBtnComponent from "../../BasicComponents/AntdPrimaryBtnComponent";
import { ISOStringToHierarchicalDate } from "../../../data/utils/dates";
import { Controller, useForm, useFormContext } from "react-hook-form";

const EditProfileComponent = ({ loading, setLoading }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userSlice.userData);
  const {
    register,
    formState: { errors },
    control,
    setError,
    clearErrors,
    watch,
  } = useFormContext();

  const username = watch("username");

  const [searchingUsernameAviability, setSearchingUsernameAviability] =
    useState(false);

  useEffect(() => {
    clearErrors("username");
    setSearchingUsernameAviability(true);
    if (username === userData.username) {
      return;
    }

    if (!username || username.trim() === "") {
      setError("username", {
        type: "manual",
        message: "El nombre de usuario es obligatorio",
      });
      setSearchingUsernameAviability(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      const checkUsernameAvailability = async () => {
        clearErrors("username"); // Limpia errores previos

        const { data: response, error: responseError } = await validateUsername(
          { username }
        );

        if (response) {
          if (!response.available) {
            setError("username", {
              type: "manual",
              message: "Username is not available",
            });
            setSearchingUsernameAviability(false);
          }
          setSearchingUsernameAviability(false);
        } else {
          setError("username", {
            type: "manual",
            message: "Error al verificar el nombre de usuario",
          });
          setSearchingUsernameAviability(false);
        }
      };

      checkUsernameAvailability();
    }, 700);

    return () => clearTimeout(timeoutId); // Limpia el timeout si el username cambia rápidamente
  }, [username, setError, clearErrors]);

  //////

  const name = useSelector((state) => state.editProfileSlice.name);
  const lastname = useSelector((state) => state.editProfileSlice.lastname);
  //const username = useSelector((state) => state.editProfileSlice.username);
  const description = useSelector(
    (state) => state.editProfileSlice.description
  );

  const form_configs_input_style = {
    color: theme === "dark" ? "#a9a9a9" : "#595959ea",
  };

  const token = useSelector((state) => state.authSlice.token);
  const nexModificationDate = useSelector(
    (state) => state.acountSettingsSlice.usernameNextModificationDate
  );

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

  const HandleSubmitt = async () => {
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
      <div className="edit-profile-component-images-container">
        <div
          className="edit-profile-component-front-page"
          style={
            croppedImageFrontPage === "" || croppedImageFrontPage === null
              ? {}
              : {
                  backgroundImage: `url(${croppedImageFrontPage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
          }
        >
          {croppedImageFrontPage === "" || croppedImageFrontPage === null ? (
            <UploadImageComponent
              setCroppedImage={setCroppedImageFrontPage}
              setCroppedBlob={setCroppedBlobFrontPage}
              aspectRatio={25 / 9}
              theme={theme}
            >
              <div className="edit-profile-component-front-page-image-icon">
                <LuImagePlus />
              </div>
            </UploadImageComponent>
          ) : (
            <>
              <div
                className="edit-profile-component-front-page-image-icon"
                onClick={() => {
                  setCroppedImageFrontPage(null);
                  setCroppedBlobFrontPage(null);
                }}
              >
                <BiTrash />
              </div>
              <UploadImageComponent
                setCroppedImage={setCroppedImageFrontPage}
                setCroppedBlob={setCroppedBlobFrontPage}
                aspectRatio={25 / 9}
                theme={theme}
              >
                <div className="edit-profile-component-front-page-image-icon">
                  <MdModeEdit />
                </div>
              </UploadImageComponent>
            </>
          )}
        </div>
        {/*Avatar container*/}
        <div className="edit-profile-component-avatar-image-container">
          <div className="edit-profile-component-avatar-image-btns-container">
            {croppedImageAvatar === "" || croppedImageAvatar === null ? (
              <UploadImageComponent
                setCroppedImage={setCroppedImageAvatar}
                setCroppedBlob={setCroppedBlobAvatar}
                aspectRatio={1 / 1}
                theme={theme}
              >
                <div className="edit-profile-component-avatar-image-icon">
                  <LuImagePlus />
                </div>
              </UploadImageComponent>
            ) : (
              <>
                <div
                  className="edit-profile-component-avatar-image-icon"
                  onClick={() => {
                    setCroppedImageAvatar(null);
                    setCroppedBlobAvatar(null);
                  }}
                >
                  <BiTrash />
                </div>
                <UploadImageComponent
                  setCroppedImage={setCroppedImageAvatar}
                  setCroppedBlob={setCroppedBlobAvatar}
                  aspectRatio={1 / 1}
                  theme={theme}
                >
                  <div className="edit-profile-component-avatar-image-icon">
                    <MdModeEdit />
                  </div>
                </UploadImageComponent>
              </>
            )}
          </div>
          {croppedImageAvatar === "" || croppedImageAvatar === null ? (
            <Avatar
              size={90}
              style={{ backgroundColor: "#4635B1", fontSize: 50 }}
            >
              T
            </Avatar>
          ) : (
            <Avatar size={90} src={croppedImageAvatar} />
          )}
        </div>
      </div>
      <div className="edit-profile-acount-component-form">
        <div className="edit-profile-acount-component-form-grid">
          <div className="edit-profile-component-form-field">
            <span className="edit-profile-component-form-lbl">Name</span>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <AntdInputComponent
                  {...field}
                  theme_config={form_theme_config}
                  theme={theme}
                  style={form_configs_input_style}
                />
              )}
            />
            {errors.name && (
              <span className="error-label">{errors.name.message}</span>
            )}
          </div>
          <div className="edit-profile-component-form-field">
            <span className="edit-profile-component-form-lbl">LastName</span>
            <Controller
              name="lastname"
              control={control}
              rules={{ required: "Lastname is required" }}
              render={({ field }) => (
                <AntdInputComponent
                  {...field}
                  theme_config={form_theme_config}
                  theme={theme}
                  style={form_configs_input_style}
                />
              )}
            />
            {errors.lastname && (
              <span className="error-label">{errors.lastname.message}</span>
            )}
          </div>
        </div>
        <div className="edit-profile-component-form-field">
          <span className="edit-profile-component-form-lbl">Birthday</span>
          <Controller
            name="birthday"
            control={control}
            rules={{ required: "Birthday is required" }}
            render={({ field }) => (
              <AntdDatepickerComponent
                {...field}
                style={form_configs_input_style}
                theme={theme}
                theme_config={form_theme_config}
                onChange={(date) => field.onChange(date)} // Ajuste para manejar la fecha seleccionada
              />
            )}
          />
          {errors.birthday && (
            <span className="error-label">{errors.birthday.message}</span>
          )}
        </div>
        {/*USERNAME*/}
        <div className="edit-profile-component-form-field">
          <span className="edit-profile-component-form-lbl">Username</span>
          <Controller
            name="username"
            control={control}
            rules={{ required: "Username is required" }}
            render={({ field }) => (
              <AntdInputComponent
                {...field}
                style={form_configs_input_style}
                theme={theme}
                disabled={!HandleUsernameAviableChange(nexModificationDate)}
                theme_config={form_theme_config}
                prefix={<LuAtSign />}
                sufix={
                  <>
                    {username === userData.username ||
                    searchingUsernameAviability === true ||
                    nexModificationDate !== null ? null : (
                      <>
                        {errors.username ? (
                          <ErrorRoundedIcon style={{ color: "red" }} />
                        ) : (
                          <CheckCircleRoundedIcon style={{ color: "green" }} />
                        )}
                      </>
                    )}
                  </>
                }
              />
            )}
          />
          {errors.username && (
            <span className="error-label">{errors.username.message}</span>
          )}

          {nexModificationDate ? (
            <span className="edit-profile-acount-component-form-lbl">
              Aviable change in{" "}
              {ISOStringToHierarchicalDate(nexModificationDate)}
            </span>
          ) : (
            <></>
          )}
        </div>
        {/*DESCRIPTION*/}
        <div className="edit-profile-component-form-field">
          <span className="edit-profile-component-form-lbl">About me</span>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <AntdTextAreaComponent
                {...field}
                style={form_configs_input_style}
                theme={theme}
                theme_config={form_theme_config}
              />
            )}
          />
        </div>

        <div className="edit-profile-acount-component-form-btn-container">
          <AntdPrimaryBtnComponent
            label={"Save Changes"}
            theme={theme}
            loading={loading}
            htmlType="submit"
          />
        </div>
      </div>
    </>
  );
};

export default EditProfileComponent;

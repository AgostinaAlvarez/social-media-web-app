import React, { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { ConfigProvider, Modal, Spin } from "antd";
import { FiSettings } from "react-icons/fi";
import { LuUserRoundPen } from "react-icons/lu";
import { LuLockKeyholeOpen } from "react-icons/lu";
import { BsGlobe2 } from "react-icons/bs";
import EditProfileComponent from "./EditProfileComponent";
import EditAcountComponent from "./EditAcountComponent";
import EditInterestComponent from "./EditInterestComponent";
import EditPasswordComponent from "./EditPasswordComponent";
import { useDispatch, useSelector } from "react-redux";
import { useImageCrop } from "../../../context/ImageCropContext";
import { FormProvider, useForm } from "react-hook-form";
import dayjs from "dayjs";
import {
  HandleEditProfileSettings,
  HandleSubmitByScreenSettings,
} from "../../../data/functions/profileFunctions";
import { LoadingOutlined } from "@ant-design/icons";
import { setUserData } from "../../../slice/userSlice";
import { setUsernameNextModificationDate } from "../../../slice/acountSettingsSlice";
import { message } from "antd";

const EditProfileModal = ({ isModalOpen, setIsModalOpen }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.authSlice.token);
  const userData = useSelector((state) => state.userSlice.userData);
  const {
    setCroppedBlobFrontPage,
    setCroppedBlobAvatar,

    croppedImageFrontPage,
    croppedBlobFrontPage,
    croppedImageAvatar,
    croppedBlobAvatar,
  } = useImageCrop();

  const transform_birthday_value = (birthday) => {
    const birthdayValue = dayjs(birthday);
    return birthdayValue;
  };

  const methods = useForm({
    defaultValues: {
      name: userData.name,
      lastname: userData.lastname,
      description: userData.description,
      birthday: transform_birthday_value(userData.birthday),
      username: userData.username,
      avatar_img: userData.avatar_img,
      front_page_img: userData.front_page_img,
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const find_selected_option = asideOptions.find(
      (item) => item.selected === true
    );
    const screen = find_selected_option.label;
    if (screen === "Profile") {
      const { response, error } = await HandleEditProfileSettings(
        data,
        userData.username,
        croppedImageFrontPage,
        croppedBlobFrontPage,
        croppedImageAvatar,
        croppedBlobAvatar,
        token
      );
      if (response) {
        const nextModificationDateModify = response.nextModificationDateModify;
        if (nextModificationDateModify === true) {
          dispatch(
            setUsernameNextModificationDate(response.nextModificationDate)
          );
        }
        dispatch(setUserData(response.user));
        setTimeout(() => {
          setLoading(false);
          message.success("Profile updated");
        }, 2000);
      } else {
        console.log("error");
        console.log(error);
      }
    }
  };

  const resetData = () => {
    //setCroppedImageFrontPage(userData.front_page_img);
    setCroppedBlobFrontPage(null);
    //setCroppedImageAvatar(userData.avatar_img);
    setCroppedBlobAvatar(null);
  };

  const handleCancel = () => {
    //oficial method for reducing code
    methods.reset();
    //

    resetData();
    setIsModalOpen(false); // Cierra el modal
  };

  const handleClose = () => {
    console.log("cerrar");
    setIsModalOpen(false); // Cierra el modal
  };

  const edit_profile_aside_options = [
    {
      icon: <LuUserRoundPen />,
      label: "Profile",
      component: (
        <EditProfileComponent loading={loading} setLoading={setLoading} />
      ), // Clave única
      selected: true,
      id: "1",
    },
    {
      icon: <FiSettings />,
      label: "Account",
      component: <EditAcountComponent />,
      selected: false,
      id: "2",
    },
    {
      icon: <LuLockKeyholeOpen />,
      label: "Security",
      component: <EditPasswordComponent />,
      selected: false,
      id: "4",
    },
    {
      icon: <BsGlobe2 />,
      label: "Interests",
      component: <EditInterestComponent />,
      selected: false,
      id: "3",
    },
  ];

  const [asideOptions, setAsideOptions] = useState(edit_profile_aside_options);

  const HandleSelectAsieOption = (id) => {
    const update_data = edit_profile_aside_options.map((item) => {
      if (item.id === id) {
        return { ...item, selected: true };
      }
      return { ...item, selected: false };
    });
    setAsideOptions(update_data);
  };

  const HandleRenderComponent = () => {
    const find_selected_option = asideOptions.find(
      (item) => item.selected === true
    );
    const component = find_selected_option.component;
    return component;
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: theme === "dark" ? "#1b1b1b" : "#ffffff",
              headerBg: theme === "dark" ? "#1b1b1b" : "#ffffff",
            },
          },
          token: {
            colorText: theme === "dark" ? "#ffffff" : "rgba(0, 0, 0, 0.88)",
            colorIcon: theme === "dark" ? "#ffffff" : "rgba(0, 0, 0, 0.88)",
          },
        }}
      >
        <Modal
          title={null}
          open={isModalOpen}
          style={{
            top: 20,
          }}
          onCancel={handleCancel}
          footer={null}
          width={"65vw"}
        >
          <div className="edit-profile-screen">
            {/*ASIDE*/}
            <div className="edit-profile-screen-aside">
              {asideOptions.map((item, index) => (
                <div
                  key={index}
                  className={`edit-profile-screen-aside-item edit-profile-screen-aside-item-hover ${
                    item.selected === true
                      ? "edit-profile-screen-aside-item-cta"
                      : ""
                  }`}
                  onClick={() => {
                    HandleSelectAsieOption(item.id);
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            {/*CONTENT*/}

            <FormProvider {...methods}>
              <form
                style={{ position: "relative" }}
                onSubmit={methods.handleSubmit(onSubmit)}
                className="edit-profile-screen-content"
              >
                {HandleRenderComponent()}
                {loading && (
                  <div className="settings-overlay">
                    <Spin indicator={<LoadingOutlined spin />} />
                  </div>
                )}
              </form>
            </FormProvider>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default EditProfileModal;

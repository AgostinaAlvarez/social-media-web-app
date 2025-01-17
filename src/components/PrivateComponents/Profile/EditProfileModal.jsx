import React, { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { ConfigProvider, Modal } from "antd";
import { FiSettings } from "react-icons/fi";
import { LuUserRoundPen } from "react-icons/lu";
import { LuLockKeyholeOpen } from "react-icons/lu";
import { BsGlobe2 } from "react-icons/bs";
import EditProfileComponent from "./EditProfileComponent";
import EditAcountComponent from "./EditAcountComponent";
import EditInterestComponent from "./EditInterestComponent";
import EditPasswordComponent from "./EditPasswordComponent";
import { useSelector } from "react-redux";
import { useImageCrop } from "../../../context/ImageCropContext";
import { FormProvider, useForm } from "react-hook-form";
import dayjs from "dayjs";

const EditProfileModal = ({ isModalOpen, setIsModalOpen }) => {
  const { theme } = useTheme();
  const userData = useSelector((state) => state.userSlice.userData);

  const transform_birthday_value = (birthday) => {
    const birthdayValue = dayjs(birthday);
    return birthdayValue;
  };

  const methods = useForm({
    defaultValues: {
      nombre: "eduardo",
      email: "",
      name: userData.name,
      lastname: userData.lastname,
      description: userData.description,
      birthday: transform_birthday_value(userData.birthday),
      username: userData.username,
    },
    mode: "onSubmit",
  });

  const onSubmit = (data) => {
    console.log("Formulario enviado con los datos:", data);
  };

  const {
    setCroppedImageFrontPage,
    setCroppedBlobFrontPage,
    setCroppedImageAvatar,
    setCroppedBlobAvatar,
  } = useImageCrop();

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
      component: <EditProfileComponent />, // Clave única
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
                onSubmit={methods.handleSubmit(onSubmit)}
                className="edit-profile-screen-content"
              >
                {HandleRenderComponent()}
              </form>
            </FormProvider>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default EditProfileModal;

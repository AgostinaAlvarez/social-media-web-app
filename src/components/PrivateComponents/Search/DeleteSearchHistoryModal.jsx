import React from "react";
import AntdSecondaryBtnComponent from "../../BasicComponents/AntdSecondaryBtnComponent";
import { ConfigProvider, Modal } from "antd";
import { useTheme } from "../../../context/ThemeContext";
import AntdPrimaryBtnComponent from "../../BasicComponents/AntdPrimaryBtnComponent";

const DeleteSearchHistoryModal = ({
  isModalOpen,
  setIsModalOpen,
  handleAction,
}) => {
  const { theme } = useTheme();
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: theme === "dark" ? "#262626" : "#ffffff",
            headerBg: theme === "dark" ? "#262626" : "#ffffff",
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
        width={400}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>Delete search history?</span>
          <p style={{ textAlign: "center" }}>
            You will not be able to undo this action. Keep in mind that even if
            you clear your search history, you may still see accounts you've
            searched for as suggested results.
          </p>
          <div onClick={handleAction}>Delete all</div>
          <div onClick={handleCancel}>Not now</div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default DeleteSearchHistoryModal;

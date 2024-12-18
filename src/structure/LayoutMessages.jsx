import {
  Avatar,
  Badge,
  Button,
  ConfigProvider,
  Dropdown,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { IoNotifications } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LayoutDrawer from "../components/PrivateComponents/Drawer/LayoutDrawer";
import { setDrawerType } from "../slice/drawerSlice";
import {
  DownOutlined,
  SettingOutlined,
  MoonOutlined,
  LogoutOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import { HiLogout } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import { useTheme } from "../context/ThemeContext";
import { setSelectedConversationSlice } from "../slice/messageSlice";
import { socket } from "../router/PrivateRoutes";
import { store } from "../store/store";
import {
  addMessageToInbox,
  addMessageToRequest,
} from "../slice/conversationSlice";

const LayoutMessages = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("seteando conversacion a nula desde LAYOUT MESSAGE");
    dispatch(setSelectedConversationSlice(null));
  }, []);

  const [openDrawer, setOpenDrawer] = useState(false);

  const showDrawer = (value) => {
    //setSearchUserComponent(value);
    dispatch(setDrawerType(value));
    setTimeout(() => {
      setOpenDrawer(true);
    }, 100);
  };

  /*
  useEffect(() => {
    socket.on("private_message", (data) => {
      const selectedConversation =
        store.getState().messageSlice.selectedConversationSlice;
      if (!selectedConversation) {
        messageNotification();
      } else {
        if (
          selectedConversation.conversation._id !==
          data.newMessage.conversationId
        ) {
          messageNotification();
        }
      }
    });
  }, []);
  */
  const messageNotification = () => {
    api.open({
      icon: <UserOutlined />,
      message: "Sender",
      description: "mensaje",
    });
  };

  const theme_config_provider = {
    token: {
      colorBgBase: theme === "dark" ? "#262626" : "#ffffff", // Fondo base
      controlItemBgHover: theme === "dark" ? "#414141" : "rgba(0, 0, 0, 0.04)",
      colorText: theme === "dark" ? "#ffffff" : "rgba(0, 0, 0, 0.88)",
    },
  };

  const item_style = {
    padding: "18px 10px",
    color: theme === "dark" ? "white" : "black",
    fontWeight: "500",
  };

  const items = [
    {
      key: "2",
      label: "Profile",
      icon: <UserOutlined />,
      style: item_style,
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: "Configuracion",
      style: item_style,
    },
    {
      key: "4",
      icon: <MoonOutlined />,
      label: "Cambiar aspecto",
      style: item_style,
    },
    {
      type: "divider",
    },
    {
      key: "5",
      label: "Log Out",
      extra: (
        <IoLogOutOutline
          style={{ color: theme === "dark" ? "white" : "black" }}
        />
      ),
      style: item_style,
    },
  ];

  return (
    <>
      <div className="layout-private">
        <aside className="layout-messages-navigation">
          <div className="layout-private-navigation-options">
            {/*HOME*/}
            <div
              className="layout-private-navigation-item"
              onClick={() => {
                navigate("/");
              }}
            >
              <Badge>
                <Avatar
                  shape="square"
                  //style={{ backgroundColor: "red" }}
                >
                  <GoHomeFill />
                </Avatar>
              </Badge>
            </div>
            {/*SEARCH*/}
            <div
              className="layout-private-navigation-item"
              onClick={() => {
                showDrawer("search");
              }}
            >
              <Badge>
                <Avatar
                  shape="square"
                  //style={{ backgroundColor: "red" }}
                >
                  <FaSearch />
                </Avatar>
              </Badge>
            </div>
            {/*MESSAGE*/}
            <div
              className="layout-private-navigation-item"
              onClick={() => {
                navigate("/messages/inbox");
              }}
            >
              <Badge>
                <Avatar
                  shape="square"
                  //style={{ backgroundColor: "red" }}
                >
                  <BiSolidMessageSquareDots />
                </Avatar>
              </Badge>
            </div>
            {/*NOTIFICATIONS*/}
            <div
              className="layout-private-navigation-item"
              onClick={() => {
                showDrawer("notifications");
              }}
            >
              <Badge>
                <Avatar
                  shape="square"
                  //style={{ backgroundColor: "red" }}
                >
                  <IoNotifications />
                </Avatar>
              </Badge>
            </div>
          </div>
          <ConfigProvider theme={theme_config_provider}>
            <Dropdown
              menu={{
                items,
              }}
              placement="topLeft"
              overlayStyle={{ width: "230px" }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <MenuOutlined />
              </a>
            </Dropdown>
          </ConfigProvider>
        </aside>
        <div className="layout-private-children-container">{children}</div>
      </div>
      <LayoutDrawer
        showDrawer={showDrawer}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </>
  );
};

export default LayoutMessages;

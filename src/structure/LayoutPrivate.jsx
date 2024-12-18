import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  Avatar,
  Badge,
  ConfigProvider,
  Drawer,
  Switch,
  notification,
} from "antd";
import { GoHomeFill } from "react-icons/go";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import SearchComponent from "../components/PrivateComponents/SearchComponent";
import NotificationsComponent from "../components/PrivateComponents/NotificationsComponent";
import FollowRequestsComponent from "../components/PrivateComponents/FollowRequestsComponent";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerType } from "../slice/drawerSlice";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { socket } from "../router/PrivateRoutes";
import {
  addMessageToInbox,
  addMessageToRequest,
} from "../slice/conversationSlice";
import { setSelectedConversationSlice } from "../slice/messageSlice";
import LayoutDrawer from "../components/PrivateComponents/Drawer/LayoutDrawer";

const RenderDrawComponent = (value) => {
  switch (value) {
    case "search":
      return <SearchComponent />;
    case "notifications":
      return <NotificationsComponent />;
    case "follow_request":
      return <FollowRequestsComponent />;
    case null:
      return <></>;
  }
};

const RenderDrawTitle = (value) => {
  switch (value) {
    case "search":
      return "Busqueda";
    case "notifications":
      return "Notificaciones";
    case "follow_request":
      return "Solicitudes";
    case null:
      return "";
  }
};

const LayoutPrivate = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("seteando conversacion a nula desde LAYOUT PRIVATE");
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
  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <div className="layout-private">
        <aside className="layout-private-navigation">
          <div className="layout-private-navigation-options">
            {/*HOME*/}
            <div className="layout-private-navigation-item">
              <Badge>
                <Avatar
                  shape="square"
                  //style={{ backgroundColor: "red" }}
                >
                  <GoHomeFill />
                </Avatar>
              </Badge>
              <span>Home</span>
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
              <span>Busqueda</span>
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
              <span>Mensajes</span>
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
              <span>Notificaciones</span>
            </div>
          </div>
        </aside>
        <div className="layout-private-children-container">{children}</div>
      </div>
      {/*
        <ConfigProvider
          theme={{
            token: {
              lineType: "transparent",
              paddingLG: 0,
              colorText: theme === "dark" ? "white" : "black",
              colorIcon: theme === "dark" ? "white" : "black",
              colorBgElevated: theme === "dark" ? "black" : "white",
              colorBgMask:
                theme === "dark"
                  ? "rgba(124, 124, 124, 0.173)"
                  : "rgba(0, 0, 0, 0.45)",
            },
          }}
        >
          <Drawer
            title={RenderDrawTitle(drawerType)}
            onClose={onCloseDrawer}
            open={openDrawer}
            closable={false}
            headerStyle={{
              paddingLeft: 20,
              paddingRight: 20,
            }}
            placement="left"
            style={{
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
            }}
          >
            {RenderDrawComponent(drawerType)}
          </Drawer>
        </ConfigProvider>
        
        */}
      <LayoutDrawer
        showDrawer={showDrawer}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </>
  );
};

export default LayoutPrivate;

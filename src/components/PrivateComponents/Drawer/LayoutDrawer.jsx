import { ConfigProvider, Drawer } from "antd";
import React from "react";
import SearchComponent from "../SearchComponent";
import NotificationsComponent from "../NotificationsComponent";
import FollowRequestsComponent from "../FollowRequestsComponent";
import { useTheme } from "../../../context/ThemeContext";
import { useSelector } from "react-redux";

const RenderDrawComponent = (value, onCloseDrawer) => {
  switch (value) {
    case "search":
      return <SearchComponent onCloseDrawer={onCloseDrawer} />;
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
      return "Notifications";
    case "follow_request":
      return null;
    case null:
      return "";
  }
};

const LayoutDrawer = ({ showDrawer, openDrawer, setOpenDrawer }) => {
  const { theme, toggleTheme } = useTheme();
  const drawerType = useSelector((state) => state.drawerSlice.drawerType);

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };
  return (
    <>
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
          {RenderDrawComponent(drawerType, onCloseDrawer)}
        </Drawer>
      </ConfigProvider>
    </>
  );
};

export default LayoutDrawer;

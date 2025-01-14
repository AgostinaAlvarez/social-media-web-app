import { Button, ConfigProvider } from "antd";
import React from "react";

const AntdSecondaryBtnComponent = ({
  label,
  theme,
  onClick,
  style,
  className,
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: theme === "dark" ? "rgba(0, 0, 0, 0)" : "#ffffff",
          colorPrimaryHover: "#4096ff",
        },
      }}
    >
      <Button onClick={onClick} style={style} className={className}>
        {label}
      </Button>
    </ConfigProvider>
  );
};

export default AntdSecondaryBtnComponent;

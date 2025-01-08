import { ConfigProvider, Input } from "antd";
import React from "react";

const AntdInputPasswordComponent = ({
  theme,
  value,
  placeholder,
  disabled,
  style,
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainerDisabled:
            theme === "dark" ? "rgb(189, 189, 189)" : "rgba(0,0,0,0.04)",
          colorTextQuaternary:
            theme === "dark" ? "rgba(0,0,0,0.25)" : "rgb(96, 96, 96)",
        },
      }}
    >
      <Input.Password
        style={style}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
      />
    </ConfigProvider>
  );
};

export default AntdInputPasswordComponent;

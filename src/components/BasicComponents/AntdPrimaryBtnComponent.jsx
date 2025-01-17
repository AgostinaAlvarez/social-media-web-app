import { Button, ConfigProvider } from "antd";
import React from "react";

const AntdPrimaryBtnComponent = ({
  label,
  theme,
  loading,
  disabled,
  key,
  style,
  onClick,
  htmlType,
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            borderColorDisabled: theme === "dark" ? "#244a6d" : "#bfe0fc",
          },
        },
        token: {
          colorBgContainerDisabled: theme === "dark" ? "#244a6d" : "#bfe0fc",
          colorTextDisabled: theme === "dark" ? "#4b5e6f" : "#e0f0fe",
        },
      }}
    >
      <Button
        loading={loading}
        disabled={disabled}
        key={key}
        type="primary"
        style={style}
        onClick={onClick}
        htmlType={htmlType}
      >
        {label}
      </Button>
    </ConfigProvider>
  );
};

export default AntdPrimaryBtnComponent;

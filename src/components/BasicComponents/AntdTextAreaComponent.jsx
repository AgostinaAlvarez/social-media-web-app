import { ConfigProvider } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const AntdTextAreaComponent = ({
  theme,
  style,
  placeholder,
  value,
  onChange,
  theme_config,
}) => {
  const styles = {
    color: theme === "dark" ? "white" : "black",
    ...style,
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextPlaceholder:
            theme === "dark"
              ? theme_config?.colorTextPlaceholderDark
              : theme_config?.colorTextPlaceholderLight,
          colorBgContainer:
            theme === "dark"
              ? theme_config?.colorBgDark
              : theme_config?.colorBgLight,
        },
      }}
    >
      <TextArea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={styles}
      />
    </ConfigProvider>
  );
};

export default AntdTextAreaComponent;

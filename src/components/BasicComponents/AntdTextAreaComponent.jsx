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
  count,
  variant,
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
          colorTextTertiary: theme === "dark" ? "#e6e6e640" : "#00000040",
        },
      }}
    >
      <TextArea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={styles}
        count={count}
        variant={variant}
      />
    </ConfigProvider>
  );
};

export default AntdTextAreaComponent;

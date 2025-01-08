import { ConfigProvider, Input } from "antd";
import React from "react";

const AntdInputComponent = ({
  theme,
  style,
  placeholder,
  value,
  onChange,
  sufix,
  prefix,
  disabled,
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
          colorBgContainerDisabled:
            theme === "dark" ? "#202020" : "rgba(0,0,0,0.04)",
        },
      }}
    >
      <Input
        suffix={sufix}
        prefix={prefix}
        style={styles}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </ConfigProvider>
  );
};

export default AntdInputComponent;

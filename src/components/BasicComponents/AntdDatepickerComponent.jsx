import { ConfigProvider, DatePicker } from "antd";
import React from "react";
import { CalendarOutlined } from "@ant-design/icons";

const AntdDatepickerComponent = ({
  theme,
  style,
  theme_config,
  value,
  onChange,
  disabled,
}) => {
  const customCalendarIcon = (
    <CalendarOutlined style={{ color: theme === "dark" ? "white" : "black" }} />
  );
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
      <DatePicker
        disabled={disabled}
        value={value}
        onChange={onChange}
        suffixIcon={customCalendarIcon}
        style={style}
      />
    </ConfigProvider>
  );
};

export default AntdDatepickerComponent;

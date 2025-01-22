import { Button, Input, Switch } from "antd";
import React, { useState } from "react";
import AntdInputPasswordComponent from "../../BasicComponents/AntdInputPasswordComponent";
import AntdSecondaryBtnComponent from "../../BasicComponents/AntdSecondaryBtnComponent";
import { useTheme } from "../../../context/ThemeContext";
import AntdPrimaryBtnComponent from "../../BasicComponents/AntdPrimaryBtnComponent";
import AntdInputComponent from "../../BasicComponents/AntdInputComponent";
import { form_theme_config } from "../../../data/utils/inputThemes";

const EditPasswordComponent = () => {
  const [editPassword, setEditPassword] = useState(false);
  const { theme } = useTheme();

  return (
    <>
      <div className="edit-profile-acount-component-form">
        <span>Security and Password</span>
        <div className="edit-security-component-box">
          <span>Password</span>

          {editPassword === true ? (
            <form className="edit-security-component-change-password-form">
              <div>
                <span>Password</span>
                <AntdInputComponent
                  theme={theme}
                  theme_config={form_theme_config}
                />
              </div>
              <div>
                <span>New Password</span>
                <AntdInputComponent
                  theme={theme}
                  theme_config={form_theme_config}
                />
              </div>
              <div>
                <span>Confirm Password</span>
                <AntdInputComponent
                  theme={theme}
                  theme_config={form_theme_config}
                />
              </div>
              <div className="edit-security-component-box-btn-container">
                <AntdPrimaryBtnComponent theme={theme} label={"Save Changes"} />
                <AntdSecondaryBtnComponent
                  theme={theme}
                  label={"Cancel"}
                  onClick={() => {
                    setEditPassword(false);
                  }}
                />
              </div>
            </form>
          ) : (
            <>
              <AntdInputPasswordComponent
                placeholder={"************"}
                disabled={true}
                style={{ width: "fit-content" }}
              />
              <AntdPrimaryBtnComponent
                theme={theme}
                label={"Change Password"}
                style={{ width: "fit-content" }}
                onClick={() => {
                  setEditPassword(true);
                }}
              />
            </>
          )}
        </div>
        <div className="edit-security-component-box">
          <span>Profile Visibility</span>
          <div className="edit-security-component-box-switch-container">
            <span>Private Acount</span>
            <Switch defaultChecked />
          </div>
          <p className="edit-security-component-box-p-info">
            If your account is public, any user within the app will be able to
            view your profile and posts.
          </p>
          <p className="edit-security-component-box-p-info">
            If your account is private, only the followers you approve will be
            able to see the content you share, such as your posts, images, and
            your followers and following list. Certain profile information, such
            as your profile picture and username, is visible to everyone within
            the app.
          </p>
          <div className="edit-security-component-box-btn-container">
            <AntdPrimaryBtnComponent theme={theme} label={"Save Changes"} />
            <AntdSecondaryBtnComponent theme={theme} label={"Reset"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPasswordComponent;

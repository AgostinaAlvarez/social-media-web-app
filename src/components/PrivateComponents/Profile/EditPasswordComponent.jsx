import { Button, Input, Switch } from "antd";
import React, { useState } from "react";

const EditPasswordComponent = () => {
  const [editPassword, setEditPassword] = useState(false);

  return (
    <>
      <div className="edit-profile-acount-component-form">
        <span>Security and Password</span>
        <div className="edit-security-component-box">
          <span>Password</span>

          {editPassword === true ? (
            <form className="edit-security-component-change-password-form">
              <div>
                <span>New Password</span>
                <Input />
              </div>
              <div>
                <span>Confirm Password</span>
                <Input />
              </div>
              <div className="edit-security-component-box-btn-container">
                <Button>Save Changes</Button>
                <Button
                  onClick={() => {
                    setEditPassword(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <>
              <Input.Password
                disabled
                placeholder="************"
                style={{ width: "fit-content" }}
              />
              <Button
                onClick={() => {
                  setEditPassword(true);
                }}
                style={{ width: "fit-content" }}
              >
                Change Password
              </Button>
            </>
          )}
        </div>
        <div className="edit-security-component-box">
          <span>Profile Visibility</span>
          <div className="edit-security-component-box-switch-container">
            <span>Public Acount</span>
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
            <Button>Save Changes</Button>
            <Button>Reset</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPasswordComponent;

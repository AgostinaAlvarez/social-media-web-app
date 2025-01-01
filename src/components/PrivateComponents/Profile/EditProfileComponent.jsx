import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { MdModeEdit } from "react-icons/md";
import { LuAtSign } from "react-icons/lu";

const EditProfileComponent = () => {
  return (
    <>
      <div className="edit-profile-acount-component-header">
        <div className="edit-profile-acount-component-header-edit-container">
          <MdModeEdit />
        </div>
        <div className="edit-profile-acount-component-header-avatar"></div>
      </div>
      <form className="edit-profile-acount-component-form">
        <div className="edit-profile-acount-component-form-grid">
          <div>
            <span>Name</span>
            <Input />
          </div>
          <div>
            <span>LastName</span>
            <Input />
          </div>
        </div>
        <div>
          <span>Birthday</span>
          <Input />
        </div>
        <div>
          <span>Username</span>
          <Input prefix={<LuAtSign />} />
          <span className="edit-profile-acount-component-form-lbl">
            Aviable change in 25/02/2025
          </span>
        </div>
        <div>
          <span>About me</span>
          <TextArea />
        </div>
        <div className="edit-profile-acount-component-form-btn-container">
          <Button type="primary">Save Changes</Button>
        </div>
      </form>
    </>
  );
};

export default EditProfileComponent;

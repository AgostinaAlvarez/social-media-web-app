import React from "react";
import { FaUserEdit } from "react-icons/fa";

const EditProfileScreen = () => {
  const edit_profile_aside_menu_options = [
    {
      icon: "",
      label: "Profile",
      selected: true,
    },
  ];
  return (
    <div className="edit-profile-screen">
      <div className="edit-profile-screen-aside">
        <div className="edit-profile-screen-aside-item edit-profile-screen-aside-item-cta">
          <span>Icon</span>
          <span>Label</span>
        </div>
        <div className="edit-profile-screen-aside-item">
          <span>Icon</span>
          <span>Label</span>
        </div>
      </div>
      <div className="edit-profile-screen-content">
        <div>Contenido</div>
      </div>
    </div>
  );
};

export default EditProfileScreen;

import { Button } from "antd";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import AntdSecondaryBtnComponent from "../../BasicComponents/AntdSecondaryBtnComponent";
import { useTheme } from "../../../context/ThemeContext";

const EditInterestComponent = () => {
  const { theme } = useTheme();

  return (
    <>
      <div className="edit-profile-acount-component-form">
        <span>Interests</span>
        <p className="edit-profile-interest-p-info">
          The interests you select will help the platform show you relevant
          content tailored to your preferences. You can update your interests at
          any time, and the changes will affect the content you see in your
          feed. Make sure to choose topics you genuinely care about for a more
          personalized experience.
        </p>
        <div className="edit-profile-interest-list-container">
          <div className="edit-profile-interest-item">
            <span>Un item</span>
          </div>
          <div className="edit-profile-interest-item">
            <span>Another item large</span>
          </div>
          <div className="edit-profile-interest-item">
            <span>Item medium</span>
          </div>
          <div className="edit-profile-interest-item">
            <span>Another item large</span>
          </div>
        </div>
        <div className="edit-profile-interest-btn-container">
          <AntdSecondaryBtnComponent
            theme={theme}
            label={"+ Add More"}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </>
  );
};

export default EditInterestComponent;

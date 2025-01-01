import { Button } from "antd";
import React, { useState } from "react";
import { Flex, Input, Typography } from "antd";
import { TextField } from "@mui/material";
const { Title } = Typography;

const EditAcountComponent = () => {
  const [step, setStep] = useState(1);

  const onChange = (text) => {
    console.log("onChange:", text);
  };
  const onInput = (value) => {
    console.log("onInput:", value);
  };
  const sharedProps = {
    onChange,
    onInput,
  };
  return (
    <>
      <form className="edit-profile-acount-component-form">
        {step === 1 ? (
          <>
            <span>Personal Information</span>
            <div>
              <span>Email</span>
              <div className="edit-profile-acount-component-form-email-container">
                example-user@example.com
              </div>
            </div>
            <div>
              <span>New Email</span>
              <Input />
            </div>
            <div>
              <span>Confirm Email</span>
              <Input />
            </div>
            <p className="edit-profile-acount-component-form-info-p">
              If you are going to change the email address associated with your
              account, we will send a verification code to the new email address
              you provide to ensure your security. This change will not take
              effect immediately. You will need to enter the code you receive in
              your inbox to confirm and complete the process. Make sure the new
              email address is valid and accessible.
            </p>
            <div className="edit-profile-acount-component-form-btn-container">
              <Button
                type="primary"
                onClick={() => {
                  setStep(2);
                }}
              >
                Save Changes
              </Button>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                width: "80%",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginTop: 30,
              }}
            >
              <span>Verification Code</span>
              <span>
                Te hemos enviado un código a email-example@example.com.
                Introdúcelo abajo para verificar el email
              </span>
              <TextField
                //{...field}
                style={{ margin: "10px 0px" }}
                label="Codigo de verificación"
                variant="outlined"
                fullWidth
                //error={!!errors.code}
                //helperText={errors.code ? errors.code.message : ""}
              />
              <div className="edit-profile-acount-component-form-grid ">
                <Button type="primary">Aceptar</Button>
                <Button
                  type="primary"
                  onClick={() => {
                    setStep(1);
                  }}
                >
                  Reenviar
                </Button>
              </div>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default EditAcountComponent;

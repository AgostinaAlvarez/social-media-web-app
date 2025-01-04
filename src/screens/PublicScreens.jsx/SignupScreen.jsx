import { Button, Modal, Spin } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import SignupFirstStep from "../../components/PublicComponents/SignupFirstStep";
import SignupCodeStep from "../../components/PublicComponents/SignupCodeStep";
import SignupPasswordStep from "../../components/PublicComponents/SignupPasswordStep";
import ggl_icon from "../../assets/ggl-icon.png";
import SignupPreferencesStep from "../../components/PublicComponents/SignupPreferencesStep";
import OverlayComponent from "../../components/OverlayComponent";
import { LoadingOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled } from "@ant-design/icons";
import SignupUsernameStep from "../../components/PublicComponents/SignupUsernameStep";
import { SignUpUser, SignupUser } from "../../data/api/authApi";
import { useDispatch } from "react-redux";
import SignupAvatarStep from "../../components/PublicComponents/SignupAvatarStep";

const showErrorModal = () => {
  Modal.error({
    title: "Algo salió mal!",
    icon: <ExclamationCircleFilled />,
    content: "Intenta de nuevo más tarde",
  });
};

const SignUpScreen = () => {
  const navigate = useNavigate();
  const stepInitialState = 1;
  const dispatch = useDispatch();
  const [step, setStep] = useState(stepInitialState);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
    setStep(stepInitialState);
  };

  const HandleSetStep = (value) => {
    setStep(value);
  };

  const HandleFinishSteps = (user, token) => {
    setLoading(true);
    setOpen(false);
    setStep(1);
    setTimeout(async () => {
      await SignUpUser(dispatch, user, token, setLoading);
    }, 1500);
  };

  const HandleServerError = () => {
    setOpen(false);
    setStep(1);
    setTimeout(() => {
      showErrorModal();
    }, 1000);
  };

  const RenderModalComponent = (step) => {
    switch (step) {
      case 1:
        return (
          <SignupFirstStep
            HandleSetStep={HandleSetStep}
            HandleServerError={HandleServerError}
          />
        );
      case 2:
        return <SignupCodeStep HandleSetStep={HandleSetStep} />;
      case 3:
        return <SignupPreferencesStep HandleSetStep={HandleSetStep} />;
      case 4:
        return <SignupUsernameStep HandleSetStep={HandleSetStep} />;
      case 5:
        return <SignupPasswordStep HandleSetStep={HandleSetStep} />;
      case 6:
        return <SignupAvatarStep HandleFinishSteps={HandleFinishSteps} />;
    }
  };

  return (
    <>
      {loading ? (
        <OverlayComponent>
          <Spin indicator={<LoadingOutlined spin style={{ fontSize: 60 }} />} />
        </OverlayComponent>
      ) : (
        <></>
      )}
      <div className="auth-bg">
        <div className="auth-bg-col auth-bg-col-left">
          <div className="auth-signup-box">
            <span className="auth-signup-ttl">Sign up</span>
            <div className="auth-signup-btn-container">
              <div className="auth-signup-btn">
                <img src={ggl_icon} style={{ height: 15 }} />
                <span>Registrarse con Google</span>
              </div>
              <div className="auth-signup-divider-container">
                <div className="auth-signup-divider-line"></div>
                <span>o</span>
                <div className="auth-signup-divider-line"></div>
              </div>
              <div
                className="auth-signup-btn auth-signup-btn-cta"
                onClick={showModal}
              >
                <span>Crear cuenta</span>
              </div>
              <p className="auth-signup-box-info-p">
                Al registrarte, aceptas los{" "}
                <span
                  style={{
                    color: "#4096ff",
                    cursor: "pointer",
                  }}
                >
                  Términos de servicio
                </span>{" "}
                y la{" "}
                <span
                  style={{
                    color: "#4096ff",
                    cursor: "pointer",
                  }}
                >
                  Política de privacidad
                </span>
                , incluida la política de{" "}
                <span
                  style={{
                    color: "#4096ff",
                    cursor: "pointer",
                  }}
                >
                  Uso de Cookies
                </span>
                .
              </p>
            </div>
            <span>
              ¿Ya tienes una cuenta?{" "}
              <span
                onClick={() => {
                  navigate("/login");
                }}
                style={{
                  color: "#4096ff",
                  cursor: "pointer",
                }}
              >
                Iniar sesion
              </span>
            </span>
          </div>
        </div>
        <div className="auth-bg-col auth-bg-col-right"></div>
      </div>
      {/*
            <button onClick={showModal}>Abrir modal</button>
      <div>
        <p>Signup Screen</p>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Ir al Login Screen
        </button>
        <button onClick={showModal}>Abrir modal</button>
      </div>
      
    */}
      <Modal
        open={open}
        title=""
        //onOk={handleOk}
        onCancel={handleCancel}
        footer={[<></>]}
        width={600}
        style={{
          top: 25,
        }}
      >
        {RenderModalComponent(step)}
      </Modal>
    </>
  );
};

export default SignUpScreen;

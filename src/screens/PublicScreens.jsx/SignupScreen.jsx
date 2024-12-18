import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpScreen = () => {
  const navigate = useNavigate();

  const [setp, setStep] = useState(1);

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
  };

  return (
    <>
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
      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Submit
          </Button>,
          <Button
            key="link"
            href="https://google.com"
            target="_blank"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Search on Google
          </Button>,
        ]}
      >
        {step === 1 ? (
          <>
            <div>Primera paso</div>
          </>
        ) : (
          <>
            <div>Segundo paso</div>
          </>
        )}
      </Modal>
    </>
  );
};

export default SignUpScreen;

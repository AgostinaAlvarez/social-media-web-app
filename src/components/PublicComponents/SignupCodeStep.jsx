import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Button, ConfigProvider } from "antd";
import "../../styles/presignup.css";
import { useSelector } from "react-redux";
import { validateCode } from "../../data/api/signupApi";

const SignupCodeStep = ({ HandleSetStep, HandleServerError }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    clearErrors,
    setError,
  } = useForm();

  const theme = "light";
  const [loading, setLoading] = useState(false);

  const preSignupData = useSelector(
    (state) => state.preSignupSlice.preSignupData
  );

  // Función para manejar el envío del formulario
  const onSubmit = async (data) => {
    setLoading(true);
    const request_data = {
      ...data,
      email: preSignupData.email,
    };
    const { data: response, error: response_error } = await validateCode(
      request_data
    );

    if (response) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setTimeout(() => {
        HandleSetStep(3);
      }, 2500);
    } else {
      if (response_error.data?.code === "VALIDATION_ERROR") {
        setTimeout(() => {
          setLoading(false);
          setError("code", {
            type: "manual",
            message: "El Codigo es incorrecto",
          });
        }, 1500);
      } else {
        setLoading(false);
        HandleServerError();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="presignup-form">
      <span className="presignup-form-ttl">Te hemos enviado un código</span>
      <span className="presignup-form-code-span">
        Introdúcelo abajo para verificar el email {preSignupData.email}
      </span>

      <Controller
        name="code"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Codigo de verificación"
            variant="outlined"
            fullWidth
            error={!!errors.code}
            helperText={errors.code ? errors.code.message : ""}
          />
        )}
        rules={{ required: "Debes ingresar el código" }}
      />

      <ConfigProvider
        theme={{
          components: {
            Button: {
              borderColorDisabled: theme === "dark" ? "#244a6d" : "#bfe0fc",
            },
          },
          token: {
            colorBgContainerDisabled: theme === "dark" ? "#244a6d" : "#bfe0fc",
            colorTextDisabled: theme === "dark" ? "#4b5e6f" : "#e0f0fe",
          },
        }}
      >
        <Button
          loading={loading ? true : false}
          disabled={!isValid ? true : false}
          htmlType="submit"
          type="primary"
          style={{ width: "100%", height: 50, marginTop: 10 }}
        >
          Siguiente
        </Button>
      </ConfigProvider>
    </form>
  );
};

export default SignupCodeStep;

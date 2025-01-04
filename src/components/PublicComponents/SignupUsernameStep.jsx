import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Button, ConfigProvider } from "antd";
import "../../styles/presignup.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { FiAtSign } from "react-icons/fi";
//check
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
//clear
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
//error
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

import { validateUsername } from "../../data/api/signupApi";
import { useDispatch, useSelector } from "react-redux";
import { setPreSignupData } from "../../slice/preSignupSlice";

const SignupUsernameStep = ({ HandleSetStep }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    clearErrors,
    setError,
  } = useForm();

  const theme = "light";
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const preSignupData = useSelector(
    (state) => state.preSignupSlice.preSignupData
  );

  const [isValid, setIsValid] = useState(false);
  const [isAviable, setIsAviable] = useState(null);

  const [errorRespone, setErrorRespone] = useState(null);

  const username_value = watch("username");

  useEffect(() => {
    if (!username_value || username_value.trim() === "") {
      setIsValid(false);
      setIsAviable(null);
      return;
    }

    const timeoutId = setTimeout(() => {
      const searchUsername = async () => {
        setErrorRespone(null);
        const { data: response, error: response_error } =
          await validateUsername({ username: username_value });
        if (response) {
          setIsAviable(response.available);
          setIsValid(response.available);
          if (response.available === false) {
            setError("username", {
              type: "manual",
              message:
                "Este nombre de usuario ya está en uso. Por favor, elige otro.",
            });
          } else {
            clearErrors();
          }
        } else {
          setErrorRespone(true);
          setError("username", {
            type: "manual",
          });
          setIsAviable(null);
          setIsValid(false);
        }
      };
      searchUsername();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [username_value]);

  useEffect(() => {
    setIsAviable(null);
    clearErrors();
    setIsValid(false);
  }, [username_value]);

  const onSubmit = (data) => {
    setLoading(true);
    const update_data = { ...preSignupData, ...data };
    dispatch(setPreSignupData(update_data));
    setTimeout(() => {
      setLoading(false);
    }, 2500);
    setTimeout(() => {
      HandleSetStep(5);
    }, 2600);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="presignup-form">
      <span className="presignup-form-ttl">¿Cómo te llamas?</span>
      <span>Tu @usuario es único. Puedes cambiarlo cuando quieras.</span>

      <FormControl variant="outlined" error={!!errors.username}>
        <InputLabel htmlFor="username">Nombre de usuario</InputLabel>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: "Debes ingresar el username" }}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              id="username"
              type={"text"}
              startAdornment={
                <InputAdornment position="start">
                  <FiAtSign />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  {errorRespone ? (
                    <ErrorRoundedIcon style={{ color: "#FFC145" }} />
                  ) : (
                    <>
                      {isAviable === true ? (
                        <CheckCircleRoundedIcon style={{ color: "green" }} />
                      ) : (
                        <>
                          {isAviable === false ? (
                            <ErrorRoundedIcon style={{ color: "red" }} />
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </>
                  )}
                </InputAdornment>
              }
              label="Nombre de usuario"
            />
          )}
        />
        <FormHelperText>
          {errors.username ? errors.username.message : ""}
        </FormHelperText>
      </FormControl>
      {errorRespone ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <ErrorRoundedIcon style={{ color: "#FFC145" }} />
          <span style={{ color: "red" }}>
            Algo salio mal! intentalo de nuevo mas tarde
          </span>
        </div>
      ) : (
        <></>
      )}
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
          disabled={!isValid}
          //disabled={!isValid ? true : false}
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

export default SignupUsernameStep;

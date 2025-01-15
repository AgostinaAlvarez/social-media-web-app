import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OverlayComponent from "../../components/OverlayComponent";
import { Controller, useForm } from "react-hook-form";
import { LogIn } from "../../data/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Spin } from "antd";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ConfigProvider } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    setTimeout(async () => {
      await LogIn(dispatch, data, setLoading);
    }, 1500);
  };

  return (
    <>
      {loading === true ? (
        <OverlayComponent>
          <Spin indicator={<LoadingOutlined spin style={{ fontSize: 60 }} />} />
        </OverlayComponent>
      ) : (
        <></>
      )}
      <div className="auth-bg">
        <div className="auth-bg-col auth-bg-col-left">
          <div className="auth-signup-box">
            <span className="auth-signup-ttl">Sign In</span>

            <form onSubmit={handleSubmit(onSubmit)} className="auth-fom">
              <div className="auth-form-field-container">
                <span>Username</span>
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  rules={{ required: "El nombre de usuario es obligatorio" }}
                  render={({ field }) => (
                    <Input {...field} status={errors.username && "error"} />
                  )}
                />
                {errors.username && (
                  <span className="auth-error-label">
                    *{errors.username.message}
                  </span>
                )}
              </div>
              <div className="auth-form-field-container">
                <span>Password</span>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "La contraseña es obligatoria",
                  }}
                  render={({ field }) => (
                    <Input.Password
                      {...field}
                      placeholder="Contraseña"
                      prefix={<LockOutlined />}
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      status={errors.password && "error"}
                    />
                  )}
                />
                {errors.password && (
                  <span className="auth-error-label">
                    *{errors.password.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="auth-signup-btn auth-signup-btn-cta"
                style={{ marginTop: 15, borderStyle: "none" }}
              >
                <span>Sign In</span>
              </button>
            </form>

            <span>
              Don't have an account?{" "}
              <span
                onClick={() => {
                  navigate("/signup");
                }}
                style={{
                  color: "#4096ff",
                  cursor: "pointer",
                }}
              >
                Sign Up
              </span>
            </span>
          </div>
        </div>
        <div className="auth-bg-col auth-bg-col-right"></div>
      </div>
      {/*
      <div>
        <p>Login Screen</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: "El nombre de usuario es obligatorio" }}
              render={({ field }) => (
                <Input {...field} status={errors.username && "error"} />
              )}
            />
            {errors.username && (
              <span className="auth-error-label">
                *{errors.username.message}
              </span>
            )}
          </div>
          <div>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "La contraseña es obligatoria",
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Contraseña"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  status={errors.password && "error"}
                />
              )}
            />
            {errors.password && (
              <span className="auth-error-label">
                *{errors.password.message}
              </span>
            )}
          </div>
          <Button htmlType="submit" disabled={!isValid ? true : false}>
            {loading ? <Spin size="small" /> : <>Iniciar sesion</>}
          </Button>
        </form>
        <div
          onClick={() => {
            navigate("/signup");
          }}
        >
          Ir al Signup Screen
        </div>
      </div>
      
      */}
    </>
  );
};

export default LoginScreen;

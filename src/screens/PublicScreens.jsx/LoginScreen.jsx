import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OverlayComponent from "../../components/OverlayComponent";
import { Controller, useForm } from "react-hook-form";
import { LogIn } from "../../data/api/authApi";
import { useDispatch } from "react-redux";
import { Button, Input, Spin } from "antd";

import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const { succes, error } = await LogIn(dispatch, data);
    console.log({
      succes,
      error,
    });

    if (succes) {
      //navigate("/");
    }
  };

  return (
    <>
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
    </>
  );
};

export default LoginScreen;

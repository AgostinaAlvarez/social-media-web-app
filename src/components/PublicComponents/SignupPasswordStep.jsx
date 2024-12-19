import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import { Button, ConfigProvider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setPreSignupData } from "../../slice/preSignupSlice";

const SignupPasswordStep = ({ HandleFinishSteps }) => {
  const theme = "light";
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
    clearErrors,
  } = useForm();

  const dispatch = useDispatch();
  const preSignupData = useSelector(
    (state) => state.preSignupSlice.preSignupData
  );

  // Estados independientes para "ver/ocultar" contraseña y confirmación
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const passwordValue = watch("password", ""); // Observa el valor del campo password

  const onSubmit = (data) => {
    const new_data = { password: data.password, ...preSignupData };
    HandleFinishSteps(new_data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="presignup-form">
      <span className="presignup-form-ttl">Necesitarás una contraseña</span>
      <span>Asegúrate de que tenga 8 caracteres o más.</span>
      {/* Campo de contraseña */}
      <FormControl
        //sx={{ m: 1, width: "25ch" }}
        variant="outlined"
        error={!!errors.password}
      >
        <InputLabel htmlFor="password">Contraseña</InputLabel>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          }}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              id="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword === false ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Contraseña"
            />
          )}
        />
        <FormHelperText>
          {errors.password ? errors.password.message : ""}
        </FormHelperText>
      </FormControl>

      {/* Campo de confirmación de contraseña */}
      <FormControl
        //sx={{ m: 1, width: "25ch" }}
        variant="outlined"
        error={!!errors.confirmPassword}
      >
        <InputLabel htmlFor="confirm-password">Confirmar Contraseña</InputLabel>
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={{
            required: "Debes confirmar tu contraseña",
            validate: (value) =>
              value === passwordValue || "Las contraseñas no coinciden",
          }}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showConfirmPassword
                        ? "Ocultar confirmación"
                        : "Mostrar confirmación"
                    }
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword === false ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirmar Contraseña"
            />
          )}
        />
        <FormHelperText>
          {errors.confirmPassword ? errors.confirmPassword.message : ""}
        </FormHelperText>
      </FormControl>

      <div className="presignup-form-date-info-container">
        <p
          className="presignup-form-p"
          style={{ fontSize: "11px", lineHeight: 1.3 }}
        >
          Al registrarte, aceptas los{" "}
          <span
            style={{ fontWeight: 700, color: "#4096ff", cursor: "pointer" }}
          >
            Términos de servicio
          </span>{" "}
          y la{" "}
          <span
            style={{ fontWeight: 700, color: "#4096ff", cursor: "pointer" }}
          >
            Política de privacidad
          </span>
          , incluida la política de{" "}
          <span
            style={{ fontWeight: 700, color: "#4096ff", cursor: "pointer" }}
          >
            Uso de cookies
          </span>
          . X puede usar tu información de contacto, como tu dirección de correo
          electrónico y tu número de teléfono, con los fines descritos en
          nuestra Política de privacidad, por ejemplo, para mantener tu cuenta
          segura y personalizar nuestros servicios, incluidos los anuncios.
          <span
            style={{ fontWeight: 700, color: "#4096ff", cursor: "pointer" }}
          >
            {" "}
            Más información
          </span>
          . Otras personas podrán encontrarte por tu correo electrónico o número
          de teléfono, si los proporcionaste, a menos que elijas otra opción
          <span
            style={{ fontWeight: 700, color: "#4096ff", cursor: "pointer" }}
          >
            {" "}
            aquí
          </span>
          .
        </p>
      </div>

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

export default SignupPasswordStep;

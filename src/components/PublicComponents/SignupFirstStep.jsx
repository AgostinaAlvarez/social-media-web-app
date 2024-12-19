import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, ConfigProvider } from "antd";
import "../../styles/presignup.css";
import { createNewPreSignup } from "../../data/api/signupApi";
import { useDispatch } from "react-redux";
import { setEmail, setPreSignupData } from "../../slice/preSignupSlice";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Diciembre",
];

function generarArrayDescendente(valorInicial, length) {
  return Array.from({ length: length }, (_, index) => valorInicial - index);
}

const years = generarArrayDescendente(2024, 100);

function diasEnMes(mes, año) {
  return new Date(año, mes, 0).getDate();
}

function generarRestaSucesiva(numero) {
  return Array.from({ length: numero }, (_, index) => numero - index);
}

function getDaysArray(mes, año) {
  const dias = diasEnMes(mes, año);
  const array = generarRestaSucesiva(dias);
  return array;
}

const SignupFirstStep = ({ HandleSetStep, HandleServerError }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    clearErrors,
    watch,
    setValue,
    setError,
  } = useForm();

  const dispatch = useDispatch();

  const theme = "light";
  const [loading, setLoading] = useState(false);

  const month_value = watch("month");
  const year_value = watch("year");

  // Restaura el valor de "day" al cambiar "month" o "year"
  useEffect(() => {
    if (month_value || year_value) {
      setValue("day", ""); // Restablece el día a su valor predeterminado
    }
  }, [month_value, year_value, setValue]);

  // Función para manejar el envío del formulario
  const onSubmit = async (data) => {
    setLoading(true);
    const { day, month, year, ...form_data } = data;
    const date = new Date(Date.UTC(year, month - 1, day));
    const isoDate = date.toISOString();

    const request_data = { ...form_data, birthday: isoDate };

    const { data: response, error: response_error } = await createNewPreSignup(
      request_data
    );
    if (response) {
      //dispatch(setEmail(request_data.email));
      dispatch(setPreSignupData(request_data));
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setTimeout(() => {
        HandleSetStep(2);
      }, 2500);
    } else {
      if (response_error.data?.code === "INVALID_ACTION") {
        setTimeout(() => {
          setLoading(false);
          setError("email", {
            type: "manual", // Tipo de error manual
            message: "El email que intentas registrar ya esta en uso",
          });
        }, 1500);
      } else {
        console.log("otro tipo de error");
        setLoading(false);
        HandleServerError();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="presignup-form">
      <span className="presignup-form-ttl">Crea tu cuenta</span>
      <div className="presignup-form-user-name-container">
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Nombre"
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors.name ? "¿Cómo te llamas?" : ""}
            />
          )}
          rules={{ required: "¿Cómo te llamas?" }}
        />
        <Controller
          name="lastname"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Apellido"
              variant="outlined"
              fullWidth
              error={!!errors.lastname}
              helperText={errors.lastname ? "¿Cuál es tu apellido?" : ""}
            />
          )}
          rules={{ required: "¿Cuál es tu apellido?" }}
        />
      </div>

      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            variant="outlined"
            fullWidth
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
        )}
        rules={{ required: "¿Cuál es tu email?" }}
      />

      <div className="presignup-form-date-info-container">
        <span className="presignup-form-date-info-ttl">
          Fecha de nacimiento
        </span>
        <p className="presignup-form-p">
          Esta información no será pública. Confirma tu propia edad, incluso si
          esta cuenta es para una empresa, una mascota u otra cosa.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 0.7fr 0.7fr",
          gap: 10,
          alignItems: "flex-start",
        }}
      >
        {/* Campo Select para Mes */}
        <Controller
          name="month"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.month}>
              <InputLabel id="select-age-label">Mes</InputLabel>
              <Select
                {...field}
                labelId="select-age-label"
                label="Mes"
                defaultValue=""
              >
                {months.map((item, index) => (
                  <MenuItem value={index + 1}>{item}</MenuItem>
                ))}
              </Select>
              {errors.month && (
                <FormHelperText>{errors.month.message}</FormHelperText>
              )}
            </FormControl>
          )}
          rules={{ required: "Selecciona el mes" }}
        />
        {/* Campo Select para Año */}
        <Controller
          name="year"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.year}>
              <InputLabel id="select-age-label">Año</InputLabel>
              <Select
                {...field}
                labelId="select-age-label"
                label="Año"
                defaultValue=""
              >
                {years.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
              {errors.year && (
                <FormHelperText>{errors.year.message}</FormHelperText>
              )}
            </FormControl>
          )}
          rules={{ required: "Selecciona el Año" }}
        />
        {/* Campo Select para Día */}
        <Controller
          name="day"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.day}>
              <InputLabel id="select-day-label">Día</InputLabel>
              <Select
                {...field}
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
                labelId="select-day-label"
                label="Día"
              >
                {month_value && year_value ? (
                  getDaysArray(month_value, year_value).map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    Selecciona mes y año primero
                  </MenuItem>
                )}
              </Select>
              {errors.day && (
                <FormHelperText>{errors.day.message}</FormHelperText>
              )}
            </FormControl>
          )}
          rules={{ required: "Selecciona el día" }}
        />
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

export default SignupFirstStep;

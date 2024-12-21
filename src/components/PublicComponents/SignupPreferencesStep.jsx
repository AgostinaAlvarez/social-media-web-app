import React, { useState } from "react";
import "../../styles/presignup.css";
import { CiCircleCheck } from "react-icons/ci";
import { Button, ConfigProvider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setPreSignupData } from "../../slice/preSignupSlice";

const categorys = [
  "Music",
  "Entertainment",
  "Sports",
  "Fashion and beauty",
  "Art and culture",
  "Food",
  "Gaming",
  "Technology",
  "Travel",
  "Anime and comics",
  "Outdoor Activities",
  "Fitness",
  "Business and Finance",
  "Family and relationships",
  "Professions",
  "Science",
  "Health and Wellness",
  "Education",
  "Politics",
  "Social Issues",
  "Law",
  "History",
  "Psychology",
  "Economy",
  "Automotive",
  "Literature",
  "Philosophy",
  "Biotechnology",
  "AI and Machine Learning",
  "Space and Astronomy",
  "Robotics",
  "Marketing and Advertising",
  "Cryptocurrency and Blockchain",
  "Parenting",
  "Event Planning",
  "Pet Care",
  "Occultism",
  "Astrology",
  "Mysticism",
  "Tarot",
  "Spirituality",
  "Alchemy",
  "Family Activities",
  "Simple Family Moments",
  "Creative Inspiration",
  "Fashion Trends",
];

const SignupPreferencesStep = ({ HandleSetStep }) => {
  const theme = "light";
  const dispatch = useDispatch();
  const preSignupData = useSelector(
    (state) => state.preSignupSlice.preSignupData
  );
  const restructuredData = categorys.map((item) => {
    return {
      label: item,
      selected: false,
    };
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(restructuredData);

  const isValid = () => {
    const selectedItems = data.filter((item) => item.selected === true);

    if (selectedItems.length >= 3) {
      return true;
    }
    return false;
  };

  const onSubmit = async () => {
    setLoading(true);
    const data_filter = data.filter((item) => item.selected === true);
    const request_data = data_filter.map((item) => {
      return item.label;
    });
    const new_data = {
      ...preSignupData,
      interests: request_data,
    };
    dispatch(setPreSignupData(new_data));
    setTimeout(() => {
      setLoading(false);
    }, 2500);
    setTimeout(() => {
      HandleSetStep(4);
    }, 2600);
  };

  return (
    <form
      //onSubmit={handleSubmit(onSubmit)}
      className="presignup-form"
    >
      <span className="presignup-form-ttl">¿Qué quieres ver en la App?</span>

      <p style={{ lineHeight: 1.1 }}>
        Selecciona al menos 3 intereses para personalizar tu experiencia en la
        App.
      </p>

      <div
        className="presignup-form-categorys-grid"
        style={{
          //backgroundColor: "green",
          height: "300px",
          overflowY: "scroll",
          boxSizing: "border-box",
          padding: "0px 12px",
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className={`presignup-form-categorys-grid-item presignup-form-categorys-grid-item-hover ${
              item.selected === true
                ? "presignup-form-categorys-grid-item-cta"
                : ""
            }`}
            onClick={() => {
              const updateData = data.map((element) => {
                if (element.label === item.label) {
                  return {
                    ...element,
                    selected: !element.selected,
                  };
                }
                return element;
              });
              setData(updateData);
            }}
          >
            {item.selected === true ? (
              <CiCircleCheck
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  fontSize: "16px",
                }}
              />
            ) : (
              <></>
            )}
            <span style={{ textAlign: "center" }}>{item.label}</span>
          </div>
        ))}
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
          disabled={!isValid() ? true : false}
          //htmlType="submit"
          onClick={
            onSubmit
            /*
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 2500);

            setTimeout(() => {
              HandleFinishSteps();
            }, 3300);
            */
          }
          type="primary"
          style={{ width: "100%", height: 50, marginTop: 10 }}
        >
          Siguiente
        </Button>
      </ConfigProvider>
    </form>
  );
};

export default SignupPreferencesStep;

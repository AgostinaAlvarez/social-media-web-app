import axios from "axios";

export const createNewPreSignup = async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:8002/presignup/new`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response };
  }
};

export const validateCode = async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:8002/presignup/verify`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response };
  }
};

export const validateUsername = async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:8002/presignup/search-username`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response };
  }
};

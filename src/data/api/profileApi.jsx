import axios from "axios";

export const editProfile = async (data, token) => {
  try {
    const response = await axios.put(
      "http://localhost:8002/profile/edit-profile",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

export const changeUserName = async (data, token) => {
  try {
    const response = await axios.put(
      "http://localhost:8002/user/change-username",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

import axios from "axios";

export const editProfile = async (token, data) => {
  try {
    const response = await axios.put(
      "http://localhost:8002/profile/edit",
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

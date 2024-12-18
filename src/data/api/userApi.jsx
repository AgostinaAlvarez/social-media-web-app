import axios from "axios";

export const getUserDataById = async (token, userId) => {
  try {
    const response = await axios.get(
      `http://localhost:8002/user/get/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return { data: response.data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: error };
  }
};

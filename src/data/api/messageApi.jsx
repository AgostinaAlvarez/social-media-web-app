import axios from "axios";

export const sendMessage = async (token, data) => {
  try {
    const response = await axios.post(
      `http://localhost:8002/messages/send`,
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
    console.log(error);
    return { data: null, error: error };
  }
};

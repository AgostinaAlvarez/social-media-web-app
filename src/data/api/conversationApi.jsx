import axios from "axios";

export const getConversations = async (token, type) => {
  try {
    const response = await axios.get(
      `http://localhost:8002/conversation/get?limit=10&page=1&type=${type}`,
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

export const getConverstionByUserId = async (token, userId) => {
  try {
    const response = await axios.get(
      `http://localhost:8002/conversation/get-by-user/${userId}`,
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

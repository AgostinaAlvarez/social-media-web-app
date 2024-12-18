import axios from "axios";

export const getPosts = async (token, userId) => {
  try {
    const response = await axios.get(
      `http://localhost:8002/post/get/${userId}?limit=10&page=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return { data: response, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: error };
  }
};

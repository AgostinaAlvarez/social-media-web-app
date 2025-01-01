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

export const createNewPost = async (token, data) => {
  /*
  { content, imageUrl, createdAt }
  */
  try {
    const response = await axios.post("http://localhost:8002/post/new", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return { data: response, error: null };
  } catch (error) {
    console.log("error al crear el nuevo post");
    console.log(error);
    return { data: null, error: error };
  }
};

export const clasificateNewPost = async (token, data) => {
  /*
  postId: str
  date: datetime
  */
  try {
    const response = await axios.post(
      "http://localhost:8000/post_category/add",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return { data: response, error: null };
  } catch (error) {
    console.log("error al clasificar el nuevo post");
    console.log(error);
    return { data: null, error: error };
  }
};

export const getMyPosts = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:8002/post/initialization-web",
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

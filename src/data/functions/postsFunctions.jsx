import { setPosts } from "../../slice/postsSlice";
import { getMyPosts } from "../api/postApi";

export const getMyPostsFunction = async (dispatch, token) => {
  const { data: resRequest, error: errorRequest } = await getMyPosts(token);
  if (resRequest) {
    console.log("respuesta de los posts");
    console.log(resRequest.data.posts);
    dispatch(setPosts(resRequest.data.posts));
  }
};

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

export const HandleRequestMoreComments = (
  comments,
  stats,
  comments_data,
  limit
) => {
  //
  const current_comments_lenght = comments.length;
  if (current_comments_lenght === stats.totalComments) {
    console.log("no hay mas comentarios para pedir");
    return;
  }

  //this emulate the request
  const nextComments = comments_data.slice(
    current_comments_lenght,
    current_comments_lenght + limit
  );

  //add to state
  const updateComments = [...comments, ...nextComments];

  return updateComments;
};

export const HandleRequestMoreReplies = (
  comment_id,
  current_replies_lenght,
  total_replies,
  current_replies,
  limit,
  replies
) => {
  //current_replies_lenght number
  //total_replies number
  //current_replies array
  /*
   setLoadingReplies({
      comment_id: comment_id,
      loading: true,
    });
  
  */
  const find_replies = replies.find((item) => item.comment_id === comment_id);

  if (current_replies_lenght >= total_replies) {
    console.log("ya no hay nada para pedir");
    return null;
  }

  //emulate request
  const nextReplies = find_replies.replies.slice(
    current_replies_lenght,
    current_replies_lenght + limit
  );

  const updateReplies = [...current_replies, ...nextReplies];

  return updateReplies;
};

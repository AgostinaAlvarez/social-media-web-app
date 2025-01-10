import { tester_feed_for_you } from "../../../tester_data";
import {
  setFeedForYouPosts,
  setLoadingFeedForYou,
} from "../../slice/feedSlice";

export const HandleRequestFeedForYouPosts = (dispatch) => {
  //emulate the request
  const posts = tester_feed_for_you.slice(0, 10);
  const restructured_posts = posts.map((item) => {
    return {
      ...item,
      actions: {
        liked: false,
        saved: false,
      },
    };
  });
  dispatch(setFeedForYouPosts(restructured_posts));
  setTimeout(() => {
    dispatch(setLoadingFeedForYou(false));
  }, 6000);
};

const HandleRequestFeedFollowingPosts = (dispatch) => {
  //
};

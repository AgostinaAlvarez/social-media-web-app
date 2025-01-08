import { tester_feed_for_you } from "../../../tester_data";
import {
  setFeedForYouPosts,
  setLoadingFeedForYou,
} from "../../slice/feedSlice";

export const HandleRequestFeedForYouPosts = (dispatch) => {
  //emulate the request
  const posts = tester_feed_for_you.slice(0, 10);
  dispatch(setFeedForYouPosts(posts));
  setTimeout(() => {
    dispatch(setLoadingFeedForYou(false));
  }, 4000);
};

const HandleRequestFeedFollowingPosts = (dispatch) => {
  //
};

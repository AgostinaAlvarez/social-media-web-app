import {
  setConversationsInbox,
  setConversationsRequest,
  setLoadingConversationsInbox,
  setLoadingConversationsRequest,
} from "../../slice/conversationSlice";
import { getConversations } from "../api/conversationApi";

export const getDataConversations = async (dispatch, token) => {
  const { data: resRequests, error: errorRequests } = await getConversations(
    token,
    "request"
  );
  const { data: resInbox, error: errorInbox } = await getConversations(
    token,
    "message"
  );
  if (resRequests) {
    console.log(resRequests.conversations);
    dispatch(setConversationsRequest(resRequests.conversations));
  }
  if (resInbox) {
    console.log("respuesta de conversaciones de inbox");
    console.log(resInbox.conversations);
    dispatch(setConversationsInbox(resInbox.conversations));
  }
  setTimeout(() => {
    console.log("actualizando el estado");
    dispatch(setLoadingConversationsRequest(false));
    dispatch(setLoadingConversationsInbox(false));
  }, 5000);
};

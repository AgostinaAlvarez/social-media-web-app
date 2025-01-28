import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getConverstionByUserId } from "../../../data/api/conversationApi";
import { useSelector } from "react-redux";

import ChatComponent from "./ChatComponent";
import ChatComponentNewConversation from "./ChatComponentNewConversation";

const RenderChatScreen = () => {
  const params = useParams();
  const token = useSelector((state) => state.authSlice.token);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    getConversationData();
  }, []);

  const getConversationData = async () => {
    const { userId } = params;
    const { data: resConversation, error } = await getConverstionByUserId(
      token,
      userId
    );

    if (resConversation) {
      console.log("respuesta de la conversacion:");
      console.log(resConversation);

      setConversation(resConversation);

      HandleLoading();
    } else {
      console.log("error:");
      console.log(error);
      setError(true);
      HandleLoading();
    }
  };

  const HandleLoading = () => {
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error ? (
            <div>Error!</div>
          ) : (
            <>
              {conversation.conversation ? (
                <ChatComponent conversation={conversation} />
              ) : (
                <ChatComponentNewConversation userData={conversation.user} />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default RenderChatScreen;

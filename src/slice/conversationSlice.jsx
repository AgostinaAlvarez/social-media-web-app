import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversationsInbox: [],
  conversationsRequest: [],
  loadingConversationsInbox: true,
  loadingConversationsRequest: true,
};

export const conversationSlice = createSlice({
  name: "conversationSlice",
  initialState,
  reducers: {
    setConversationsInbox: (state, action) => {
      state.conversationsInbox = action.payload;
    },
    setConversationsRequest: (state, action) => {
      state.conversationsRequest = action.payload;
    },
    setLoadingConversationsInbox: (state, action) => {
      state.loadingConversationsInbox = action.payload;
    },
    setLoadingConversationsRequest: (state, action) => {
      state.loadingConversationsRequest = action.payload;
    },
    //agregar el mensaje a las conversacion del inbox
    addMessageToInbox: (state, action) => {
      const { conversationId, newMessage } = action.payload;
      //encuentra conversacion por su id
      const conversation = state.conversationsInbox.find(
        (conv) => conv.conversation._id === conversationId
      );
      // Si se encuentra la conversación, agrega el nuevo mensaje al principio del array
      if (conversation) {
        conversation.messages.messages.unshift(newMessage);
      }
    },
    //agregar el mensaje a las conversacion de las request
    addMessageToRequest: (state, action) => {
      const { conversationId, newMessage } = action.payload;
      //encuentra conversacion por su id
      const conversation = state.conversationsRequest.find(
        (conv) => conv.conversation._id === conversationId
      );
      // Si se encuentra la conversación, agrega el nuevo mensaje al principio del array
      if (conversation) {
        conversation.messages.messages.unshift(newMessage);
      }
    },
    // Nueva función para agregar una conversación al inbox
    addConversationToInbox: (state, action) => {
      const newConversation = action.payload;
      state.conversationsInbox.push(newConversation);
    },
    // Nueva función para agregar una conversación a las requests
    addConversationToRequest: (state, action) => {
      const newConversationRequest = action.payload;
      state.conversationsRequest.push(newConversationRequest);
    },
  },
});

export const {
  setConversationsInbox,
  setConversationsRequest,
  setLoadingConversationsInbox,
  setLoadingConversationsRequest,
  addMessageToInbox,
  addMessageToRequest,
  addConversationToInbox,
  addConversationToRequest,
} = conversationSlice.actions;

export default conversationSlice.reducer;

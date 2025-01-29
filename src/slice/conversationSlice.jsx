import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversationsInbox: [],
  conversationsRequest: [],
  loadingConversationsInbox: true,
  loadingConversationsRequest: true,

  testeHours: [
    "11 h",
    "11 h",
    "12 h",
    "13 h",
    "13 h",
    "15 h",
    "19 h",
    "1 d",
    "1 d",
    "2 d",
    "3 d",
    "1 wk",
    "1 wk",
    "1 wk",
  ],
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
      state.conversationsInbox.unshift(newConversation);
    },
    // Nueva función para agregar una conversación a las requests
    addConversationToRequest: (state, action) => {
      const newConversationRequest = action.payload;
      state.conversationsRequest.unshift(newConversationRequest);
    },

    addNewHour: (state, action) => {
      state.testeHours.unshift("1 min");
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
  addNewHour,
} = conversationSlice.actions;

export default conversationSlice.reducer;

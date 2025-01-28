export const renderLastMessageConversationItem = (message) => {
  if (message.length > 35) {
    const cutString = message.slice(0, 36);
    const result = `${cutString}...`;
    return result;
  }
  return message;
};

export const messageSenderByMe = (receiver, userId) => {
  if (receiver !== userId) {
    return false;
  }
  return true;
};

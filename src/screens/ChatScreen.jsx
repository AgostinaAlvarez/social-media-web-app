// ChatScreen.jsx
import React, { useState, useEffect, useRef } from "react";

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hola, ¿cuándo vienes?" },
    { id: 2, text: "Hola, estaré ahí a las 7:30pm, ¿dónde estás?" },
    { id: 3, text: "DesiBoy Pub" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isOverflowing, setIsOverflowing] = useState(false);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      setIsOverflowing(container.scrollHeight > container.clientHeight);
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      setMessages((prevMessages) => [
        { id: prevMessages.length + 1, text: inputValue },
        ...prevMessages,
      ]);
      setInputValue("");
    }
  };

  return (
    <div className="chat-container">
      <div
        className={`messages-container ${isOverflowing ? "overflow" : ""}`}
        ref={messagesContainerRef}
      >
        {messages.map((message) => (
          <div key={message.id} className="message">
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatScreen;

import React from "react";
import ChatMessage from "./ChatMessage";

const ChatContainer = ({ messages, chatContainerRef }) => {
  return (
    <div className="chat-container" ref={chatContainerRef}>
      {messages.map((message, index) => (
        <ChatMessage key={index} role={message.role} content={message.content} />
      ))}
    </div>
  );
};

export default ChatContainer;

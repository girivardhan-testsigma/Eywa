import React from "react";

const ChatMessage = ({ role, content }) => {
  const isUser = role === "user";
  return (
    <div className={`message ${isUser ? "user-message" : "bot-message"}`}>
      <div className="avatar">
        {isUser ? (
          <img src="/user_profile.png" alt="User" />
        ) : (
          <img src="/bot_profile.png" alt="Bot" />
        )}
      </div>
      <div className="message-content">{content}</div>
    </div>
  );
};

export default ChatMessage;

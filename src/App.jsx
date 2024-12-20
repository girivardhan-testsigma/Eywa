import React, { useState, useEffect, useRef } from "react";
import ChatContainer from "./components/ChatContainer";
import InputBox from "./components/InputBox";
import "./style.css";

const App = () => {
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  const addMessage = (role, content) => {
    setMessages((prevMessages) => [...prevMessages, { role, content }]);
  };

  const handleUserInput = async (userInput) => {
    if (!userInput.trim()) return;
    addMessage("user", userInput);

    // Simulate bot typing
    addMessage("bot", "Typing...");
    const response = await fetchBotResponse(userInput);
    setMessages((prevMessages) =>
      prevMessages.map((msg, idx) =>
        idx === prevMessages.length - 1 ? { ...msg, content: response } : msg
      )
    );
  };

  const fetchBotResponse = async (userInput) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userInput, session_id: "sohith" }),
      });
      const data = await response.json();
      return data.response || "Sorry, something went wrong!";
    } catch (error) {
      console.error(error);
      return "Error: Unable to fetch response.";
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="app-container">
      <div className="company-info">
        <img src="https://website-static.testsigma.com/website-next/nextjs/07dc65/images/v2/common/testsigma-logo-v3-dark.svg" alt="Company Logo" className="company-logo" />
        <h2 className="bot-title">Eywa</h2>
      </div>
      <div className="chat-box">
        <ChatContainer messages={messages} chatContainerRef={chatContainerRef} />
        <InputBox onSubmit={handleUserInput} />
      </div>
    </div>
  );
};

export default App;
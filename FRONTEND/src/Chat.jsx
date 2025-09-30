

import React, { useState } from "react";

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "You", text: input }]);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) throw new Error("Backend response not ok");

      const data = await response.json();

      // Format bot messages
      const botMessages = data.map((item) => {
        const { disease, info } = item;
        return `Predicted Disease: ${disease}\nDescription: ${info.description || "Not available"}\nHome Remedies: ${info.home_remedies?.join(", ") || "N/A"}\nAllopathy: ${info.allopathy?.join(", ") || "N/A"}\nHomeopathy: ${info.homeopathy?.join(", ") || "N/A"}`;
      }).join("\n\n");

      setMessages((prev) => [...prev, { sender: "Bot", text: botMessages }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "Bot", text: "Error connecting to backend." }]);
      console.error(error);
    }

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Health Chatbot</h2>
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "400px", overflowY: "auto", marginBottom: "10px" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: "5px 0", whiteSpace: "pre-line" }}>
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{ width: "80%", padding: "10px" }}
        placeholder="Type your symptoms..."
      />
      <button onClick={handleSend} style={{ padding: "10px", marginLeft: "5px" }}>
        Send
      </button>
    </div>
  );
};

export default Chat;

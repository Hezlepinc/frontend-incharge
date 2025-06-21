import React, { useState } from 'react';
import ChatBubble from './ChatBubble';
import './ChatWidget.css';

function ChatWidget() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://ai-assistant-platform-senp.onrender.com/api/incharge/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      if (!res.ok) {
        throw new Error(`Response error: ${res.status}`);
      }

      // TEMP: parse raw text for debugging
      const text = await res.text();
      console.log('🪵 Raw response text:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonErr) {
        throw new Error(`JSON parse error: ${jsonErr.message}`);
      }

      console.log('🧠 Parsed response:', data);

      const messageContent =
        typeof data?.response === 'string' && data.response.trim()
          ? data.response.trim()
          : typeof data?.message === 'string' && data.message.trim()
            ? data.message.trim()
            : "🤖 Sorry, I didn’t catch that. Could you try again?";

      const aiMessage = { role: 'assistant', content: messageContent };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('❌ Fetch error:', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Oops! I'm having trouble responding right now. Please try again later."
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chat-widget">
      <div className="chat-header">Incharge AI Assistant</div>
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <ChatBubble key={i} message={msg} />
        ))}
        {loading && <div className="typing-indicator">Incharge AI is typing...</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={sendMessage} disabled={loading}>Send</button>
      </div>
    </div>
  );
}

export default ChatWidget;
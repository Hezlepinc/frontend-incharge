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

      const data = await res.json();
      console.log('🧠 Claude API response:', data);

      const messageContent =
        (typeof data.response === 'string' && data.response) ||
        (typeof data.message === 'string' && data.message) ||
        '🤖 (No response received from assistant)';

      const aiMessage = { role: 'assistant', content: messageContent };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('❌ Error:', err);
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
import React from 'react';
import './ChatBubble.css';

function ChatBubble({ message }) {
  return (
    <div className={`chat-bubble ${message.role}`}>
      <strong>{message.role === 'user' ? 'You' : 'AI'}:</strong> {message.content}
    </div>
  );
}

export default ChatBubble;
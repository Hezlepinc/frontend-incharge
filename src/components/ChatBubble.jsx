import React from 'react';
import './ChatBubble.css';

function ChatBubble({ message }) {
  return (
    <div className={`chat-bubble ${message.role}`}>
      {message.content}
    </div>
  );
}

export default ChatBubble;
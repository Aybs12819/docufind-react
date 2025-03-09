// src/ChatPage.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('send_message', message);
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => socket.off('receive_message'); // Cleanup listener on unmount
  }, []);

  return (
    <div className="chat-page">
      <h2>Chat Feature</h2>

      {/* Messages */}
      <div className="messages">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatPage;

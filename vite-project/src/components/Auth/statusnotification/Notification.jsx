import React, { useEffect, useState } from 'react';
import '../../../App.css';

export default function Notification({ name }) {
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // ✅ Fetch messages for the logged-in user
  const fetchMessages = async () => {
    try {
      const res = await fetch(`http://localhost:5010/api/notifications/${name}`);
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    if (name) {
      fetchMessages();
    }
  }, [name]);

  // ✅ Handle sending new message
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (receiver === name) {
      alert("❌ You can't send a message to yourself.");
      return;
    }

    const newMessage = {
      sender: name,
      receiver,
      message
    };

    try {
      const res = await fetch('http://localhost:5010/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage)
      });

      if (res.ok) {
        alert('✅ Message sent');
        setMessage('');
        setReceiver('');
        fetchMessages();
      } else {
        alert('❌ Failed to send');
      }
    } catch (error) {
      console.error('Send error:', error);
    }
  };

  // ✅ Handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('🗑️ Delete this message?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5010/api/notifications/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setMessages(prev => prev.filter((msg) => msg.id !== id));
        alert('🧹 Deleted');
      } else {
        alert('❌ Failed to delete');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className='notification1'>
     
      <form className='notification' onSubmit={handleSubmit}>
        <div>
          <label>Message to:</label>
          <input
            type='text'
            placeholder='Enter receiver name'
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Message:</label>
          <textarea
            cols='55'
            rows='7'
            placeholder='Write your message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <button type='submit'>Submit</button>
      </form>

      <div className='messages1'>
        <h3>Messages Received</h3>
        {messages.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className='message-card'>
              <p><strong>From:</strong> {msg.sender}</p>
              <p>{msg.message}</p>
              <small>{new Date(msg.created_at).toLocaleString()}</small>
              <br />
              <button onClick={() => handleDelete(msg.id)}>🗑️ Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

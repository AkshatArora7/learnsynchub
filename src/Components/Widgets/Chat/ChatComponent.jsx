import React, { useState, useEffect, useRef } from "react";
import { firestore } from "../../../Firebase";
import "./ChatComponent.scss";
import { useAuth } from "../../../auth";

const ChatComponent = ({ otherUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { getUserId } = useAuth();
  const currentUser = getUserId();
  const messageContainerRef = useRef(null);


  useEffect(() => {
    if (otherUser != null) {
      const unsubscribe = firestore
        .collection("messages")
        .where("sender", "in", [currentUser, otherUser.id])
        .where("receiver", "in", [currentUser, otherUser.id])
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          const newMessages = snapshot.docs.map((doc) => doc.data());
          setMessages(newMessages);
          scrollToBottom();
        });

      return () => unsubscribe();
    }
  }, [currentUser, otherUser]);


  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      await firestore.collection("messages").add({
        sender: currentUser,
        receiver: otherUser.id,
        message: newMessage,
        timestamp: new Date(),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  if (!otherUser) {
    return (
      <div className="warning-container">Click on the chat to access it</div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src="https://avatar.iran.liara.run/public/8" alt="" />
        <h2>{otherUser.name}</h2>
      </div>
      <div className="message-container" ref={messageContainerRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message`}>
            <p
              className={`msg ${
                msg.sender === currentUser ? "sent" : "received"
              }`}
            >
              {msg.message}
              <span className="timestamp">
                {msg.timestamp.toDate().toLocaleString()}
              </span>
            </p>
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;

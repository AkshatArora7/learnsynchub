import React, { useEffect, useState } from "react";
import ChatComponent from "../../Components/Widgets/Chat/ChatComponent";
import ChatList from "../../Components/Widgets/Chat/ChatList";
import { useAuth } from "../../auth";
import "./ChatPage.scss";
import { useLocation } from "react-router-dom";

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState(null);
  const { getUserId } = useAuth();
  const userId = getUserId();
  const location = useLocation();

  const handleClickOnChat = (instructor) => {
    setActiveChat(instructor);
  };

  useEffect(() => {
    if (location?.state?.instructor) {
      setActiveChat(location.state.instructor);
    }
  }, [location]);

  return (
    <div className="chat-page">
      <ChatList uid={userId} onSelect={handleClickOnChat} />
      <ChatComponent otherUser={activeChat} />
    </div>
  );
};

export default ChatPage;

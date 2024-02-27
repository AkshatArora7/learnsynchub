import React, { useState } from 'react'
import ChatComponent from '../../Components/Widgets/Chat/ChatComponent'
import ChatList from '../../Components/Widgets/Chat/ChatList';
import { useAuth } from '../../auth';
import './ChatPage.scss'

const ChatPage = () => {
    const [activeChat, setActiveChat] = useState(null);
    const {getUserId} = useAuth();
    const userId=getUserId();

    const handleClickOnChat =(instructor)=>{
        setActiveChat(instructor)
    }


  return (
    <div className='chat-page'>
        <ChatList uid={userId}  onSelect={handleClickOnChat}/>
        <ChatComponent otherUser={activeChat}/>
    </div>
  )
}

export default ChatPage
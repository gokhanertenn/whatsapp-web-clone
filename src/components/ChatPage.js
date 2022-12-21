import React from 'react';
import ChatContainer from './ChatContainer';
import SideBar from "./Sidebar";
import "./ChatPage.css"

function ChatPage() {
  return (
    <div className='chatpage'>
        
        <div className='chatpage-container'>

        <SideBar/>
        <ChatContainer/>

        </div>
        

    </div>
  )
}

export default ChatPage

import React from 'react';
import ChatContainer from './ChatContainer';
import SideBar from "./Sidebar";
import "./ChatPage.css"

function ChatPage({currentUser,signOut}) {
  return (
    <div className='chatpage'>
        
        <div className='chatpage-container'>

        <SideBar currentUser={currentUser} signOut = {signOut}/>
        <ChatContainer/>

        </div>
        

    </div>
  )
}

export default ChatPage

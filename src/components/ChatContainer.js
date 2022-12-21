import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonButton from "@mui/icons-material/InsertEmoticon"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import SendIcon from "@mui/icons-material/Send"
import Picker from "emoji-picker-react"
import React, { useEffect, useState } from 'react'
import "./ChatContainer.css"
import ChatMessage from './ChatMessage';
import { useParams } from 'react-router-dom';
import db from '../firebase';

function ChatContainer({name,photoURL}) {

  const [message, setMessage] = useState("")

  const [openEmojiPicker, setOpenEmojiPicker] = useState(false)

   const {emailID} = useParams()
  
 const [chatUser,setChatUser] = useState({})

   useEffect(()=> {

   const getUser = async () => {
 
    const data = await db.collection('users').
    doc(emailID).
    onSnapshot((onsnapshot) => {
      setChatUser(onsnapshot.data())
    })

   }
   
   getUser();
   },[])

  return (
    <div className='chat-container'>
      <div className='chat-container-header'>
        <div className='chat-user-info'>
          <div className='chat-user-img'>
            <img className={chatUser.photoURL}></img>
          </div>
          <p>{chatUser.fullname}</p>
        </div>
        <div className='chat-container-header-btn'>
          <MoreVertIcon />
        </div>
      </div>
      <div className='chat-display-container'>
        <ChatMessage message="Nasılsın" date="22-04-2022" />
        <ChatMessage message="Nasılsın" date="22-04-2022" />
        <ChatMessage message="Nasılsın" date="22-04-2022" />
      </div>
      {openEmojiPicker && <Picker 
      onEmojiClick={(emojiObject,event) => {
        
        setMessage(message + emojiObject.emoji)
        setOpenEmojiPicker(!openEmojiPicker)          
      }}
      />}
      <div className='chat-input'>
        

        <div className='chat-input-btn'>

          <InsertEmoticonButton onClick = {() => setOpenEmojiPicker(!openEmojiPicker)}/>
          <AttachFileIcon />
        </div>

        <form>
          <input
            type="text"
            placeholder='Lütfen mesajınızı giriniz'
            value={message}
            onChange={(e) => {

              setMessage(e.target.value)
            }}
          >

          </input>
        </form>
        <div className='chat-input-bt'>

          <SendIcon />
        </div>

      </div>
    </div>
  )
}

export default ChatContainer

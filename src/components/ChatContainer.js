import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonButton from "@mui/icons-material/InsertEmoticon"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import SendIcon from "@mui/icons-material/Send"
import Picker from "emoji-picker-react"
import React, { useEffect, useRef, useState } from 'react'
import "./ChatContainer.css"
import ChatMessage from './ChatMessage';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import firebase from 'firebase';

function ChatContainer({currentUser}) {

  const [message, setMessage] = useState("")

  const [openEmojiPicker, setOpenEmojiPicker] = useState(false)

   const {emailID} = useParams()
  
 const [chatUser,setChatUser] = useState({})

 const [chatMessages,setChatMessages] = useState([])

 const chatBox = useRef(null)

   useEffect(()=> {

   const getUser = async () => {
 
    const data = await db.collection('users').
    doc(emailID).
    onSnapshot((onsnapshot) => {
      setChatUser(onsnapshot.data())
    })

   }
     
   const getMessages = async () => {
    const data = await db
      .collection("chats")
      .doc(emailID)
      .collection("messages")
      .orderBy("timeStamp", "asc")
      .onSnapshot((snapshot) => {
        let messages = snapshot.docs.map((doc) => doc.data());

        let newMessage = messages.filter(
          (message) =>
            message.senderEmail === (currentUser.email || emailID) ||
            message.receiverEmail === (currentUser.email || emailID)
        );

        setChatMessages(newMessage);
      });
  };
  getUser();
  getMessages();
},[emailID]);

useEffect(() => {
  chatBox.current.addEventListener("DOMNodeInserted", (event) => {
    const { currentTarget: target } = event;
    target.scroll({ top: target.scrollHeight, behavior: "smooth" });
  });
}, [chatMessages]);



  
   

   const send = (e) => {

     e.preventDefault();

     if(emailID) {
     let payload = {
      text:message,
      senderEmail : currentUser.email,
      receiverEmail : emailID,
      timeStamp : firebase.firestore.Timestamp.now()
     }
     db.collection("chats")
     .doc(currentUser.email)
     .collection('messages')
     .add(payload)


     db.collection("chats")
     .doc(emailID)
     .collection('messages')
     .add(payload)

     db.collection("Friendlist")
     .doc(currentUser.email)
     .collection('list')
     .doc(emailID)
     .set(
       {
        email:currentUser.email,
        fullname:chatUser.fullname,
        photoURL:chatUser.photoURL,
        lastMessage:message
       }
     )

     db.collection("Friendlist")
     .doc(emailID)
     .collection('list')
     .doc(currentUser.email)
     .set(
       {
        email:currentUser.email,
        fullname:currentUser.fullname,
        photoURL:currentUser.photoURL,
        lastMessage:message
       }
     )
   
     setMessage("")

     }



   }

  return (
    <div className='chat-container' >
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
      <div className='chat-display-container' ref = {chatBox}>
      
       

      {chatMessages.map((message) => (
          <ChatMessage
            message={message.text}
            time={message.timeStamp}
            sender={message.senderEmail}
          />
        ))}
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

        <form onSubmit={send}>
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
        <div className='chat-input-btn' onClick={send}>

          <SendIcon />
        </div>

      </div>
    </div>
  )
}

export default ChatContainer

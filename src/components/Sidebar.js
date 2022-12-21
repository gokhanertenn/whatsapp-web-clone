import React, { useEffect, useState } from 'react';
import TollIcon from '@mui/icons-material/Toll';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import "./Sidebar.css"
import UserProfile from './UserProfile';
import db from "../firebase"

function SideBar({currentUser,signOut}) {
  
  const [allUsers,setAllUsers] = useState([]);

  const [searchInput,setSearchInput] = useState("")
  
  
  useEffect(() => {

    const getAllUsers = async  () => {
       
      const data = await db.collection('users').onSnapshot(snapshot => {

        setAllUsers(snapshot.docs.filter((doc) => doc.data.email !== currentUser.email)
        )
      })

    }
    

     getAllUsers();
     console.log("users >>>" , allUsers)
  },[])

  const searchedInput = allUsers.filter((user) => {
     
    if(searchInput) {
       
      if(
        user.data().fullname.toLowerCase().includes(searchInput.
          toLowerCase())
        ) {
          return user ;
      }
    }})


    const searchItem = searchInput.map((user) => {
      
      return (

        <UserProfile
        
        name = {user.data().fullname}
        
        />

           


        
      )
      


    })

  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <div className='sidebar-header-img' onClick={signOut}>
             
           <img src={currentUser?.photoURL} referrerPolicy = "no-referrer"/>
           

        </div>
        <div className='sidebar-header-btn'></div>
            <TollIcon/>
            <InsertCommentIcon/>
            <MoreVertIcon/>
      </div>

         <div className='sidebar-search'> 
           <div className='sidebar-search-input'>

            <SearchIcon/>
            <input 
            type="text" 
            name='search' 
            placeholder='Search....' 
            value={searchInput}
            onChange = {(e) => setSearchInput(e.target.value)}
            ></input>
           </div>
         </div>
      <div className='sidebar-chat-list'>
             
             
             <UserProfile name="Oğuz Arslan" photoURL="./user.png" />
             <UserProfile name="Berke Kartal" photoURL="./user.png"/>
             <UserProfile name="Orkun Yetkin" photoURL="./user.png"/>
   
      </div>

    </div>
  )
}

export default SideBar

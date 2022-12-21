import React from 'react';
import SideBar from './Sidebar';
import "./Home.css";

function Home({currentUser,signOut}) {
  return (
    <div className="home">
    <div className="home-container">
      {/* SideBar */}
      <SideBar currentUser = {currentUser} signOut = {signOut}/>
      {/* a container with whatsapp-logo */}
      <div className="home-bg">
        <img src="./WhatsAppbg.png" alt="" />
      </div>
    </div>
  </div>
  )
}

export default Home

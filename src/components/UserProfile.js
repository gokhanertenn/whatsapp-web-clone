import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./UserProfile.css"
function UserProfile({name,photoURL,email}) {
   
  const navigate = useNavigate()
  
  
  const goToUser = (emailId) => {
    if (emailId) {
      navigate(`/${emailId}`);
    }
  };

  
 
  return (
    <div className='user-profile' onClick={() => goToUser(email)}>
      
      <div className='user-image' >
        <img src={photoURL}></img>
      </div>

    <div className='user-info'>
        <p className='user-name'>{name}</p>
        
    </div>

    </div>
  )
}

export default UserProfile

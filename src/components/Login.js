import React from 'react'
import db, { auth, googleProvider } from '../firebase'
import "./Login.css"
import { useNavigate } from 'react-router-dom'
function Login({setUser}) {
  
    const navigate = useNavigate() 

   const signInWithGoogle = () => {
     
    

   auth.signInWithPopup(googleProvider)
   .then((result) => {
      const newUser = {
        fullname : result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,       
      }
      navigate('/')
     setUser(newUser)
     localStorage.setItem('user',JSON.stringify(newUser))
     db.collection('users').doc(result.user.email).set(newUser)
   })
.catch((err) => alert(err.message))}



  return (
    <div className='login'>
      <div className='login-container'>
        <img className='login-logo' src='./whatsapp-logo.png'></img>
        <p className='login-name'>Whatsapp Web</p>
        <button className='login-btn' onClick={signInWithGoogle}>
           <img src='./google-logo.png'></img>
           Login With Google
        </button>
      </div>
    </div>
  )
}

export default Login

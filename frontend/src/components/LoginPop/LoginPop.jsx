import React, { useState } from 'react'
import './LoginPop.css'
import { assets } from '../../assets/assets'
const LoginPop = ({setShowLogin}) => {
  const [currState,setCurrState]=useState('Sign Up')
  return (
    <div className='login-popup'>
      <form className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross}></img>
        </div>
        <div className='login-popup-inputs'>
          {currState==='Login'?<></>:<input type='text' placeholder='Your Name' required></input>}
          <input type='email' placeholder='Enter Your Email' required></input>
          <input type='password' placeholder='Enter Your Password' required></input>
        </div>
        <button>
          {currState==='Sign Up'?"Create Account":"Login"}
        </button>
        <div className='login-pop-condition'>
          <input type='checkbox' required></input>
          <p>By continuing, i agree the terms of use and privacy policy.</p>
        </div>
        {currState==='Login'?
        <p>Create a new account?<span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>:
        <p>Already have an account?<span onClick={()=>setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPop

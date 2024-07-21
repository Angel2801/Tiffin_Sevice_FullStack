import React, { useState, useEffect, useContext } from 'react';
import './LoginPop.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPop = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState('Sign Up');
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    console.log('Sending data to:', newUrl, data);
    try {
      const response = await axios.post(newUrl, data);
      console.log('Response:', response);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error during login/register:', error);
      alert('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    console.log('Data:', data);
  }, [data]);

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross} alt="Close" />
        </div>
        <div className='login-popup-inputs'>
          {currState === 'Sign Up' && (
            <input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your Name' required />
          )}
          <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Enter Your Email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Enter Your Password' required />
          {currState === 'Sign Up' && (
            <input name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Enter Your Phone Number' required />
          )}
        </div>
        <button type='submit'>
          {currState === 'Sign Up' ? "Create Account" : "Login"}
        </button>
        <div className='login-pop-condition'>
          <input type='checkbox' required />
          <p>By continuing, I agree to the terms of use and privacy policy.</p>
        </div>
        {currState === 'Login' ? (
          <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        )}
      </form>
    </div>
  );
};

export default LoginPop;

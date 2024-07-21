import { useContext, useState } from 'react';
import React from 'react'
import {assets} from '../../assets/assets';
import './Navbar.css';
import {Link, useNavigate} from 'react-router-dom'; 
import { StoreContext } from '../../context/StoreContext';
const Navbar = ({setShowLogin}) => {
    const [menu,setMenu]=useState("home");
    const {getTotalCartAmount,token,setToken}=useContext(StoreContext);
    const navigate=useNavigate();
    const logout = ()=>{
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }
  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.img6} alt='' className='logo' style={{ width: '300px', height: '100px' }}></img></Link>
        <ul className='navbar-menu'>
            <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
            <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
            <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a>
        </ul>
        <div className='navbar-right'>
            <img src={assets.search_icon} alt='' style={{ width: '65px', height: '55px' }}></img>
            <div className='navbar-search-icon'>
                <Link to='/cart'><img src={assets.basket_icon} alt='' style={{ width: '35px', height: '35px'}}/></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>:
            <div className='navbar-profile'>
                <img src={assets.profile_icon} alt='' style={{ width: '50px', height: '50px' }}></img>
                <ul className='nav-profile-dropdown'>
                    <li><img src={assets.bag_icon} alt=''></img><p>Orders</p></li>
                    <hr></hr>
                    <li onClick={logout}><img src={assets.logout_icon} alt=''></img><p>Logout</p></li>
                </ul>
            </div>
            }
        </div>
    </div>
  )
  }
export default Navbar

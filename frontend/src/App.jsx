import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/placeOrder/placeOrder';
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import Loginpop from './components/LoginPop/LoginPop'
const App = () => {
  const [showLogin,setShowLogin]=useState(false)
  return (  
    <>
    {showLogin?<Loginpop setShowLogin={setShowLogin} />:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}></Navbar>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
      </Routes>
    </div>
    <Footer/>
    </>
  )
}
export default App

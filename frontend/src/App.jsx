import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import PlaceOrder from './pages/placeOrder/placeOrder';
import Cart from './pages/Cart/Cart';
import Footer from './components/Footer/Footer';
import Loginpop from './components/LoginPop/LoginPop';
import StoreContextProvider from './context/StoreContext';
import Verify from './pages/Verify/Verify';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <StoreContextProvider>
      {showLogin && <Loginpop setShowLogin={setShowLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <div className='main-content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<PlaceOrder />} />
            <Route path='/verify' element={<Verify />}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </StoreContextProvider>
  );
};

export default App;

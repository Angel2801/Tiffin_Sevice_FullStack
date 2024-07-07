import React from 'react'
import './AppDownload.css';
import { assets } from '../../assets/assets';
const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br></br> MealMate App</p>    
        <div className='app-download-platforms'>
            <img src={assets.playstore} alt='' style={{ width: '400px', height: '75px' }}></img>
            <img src={assets.appstore} alt='' style={{ width: '400px', height: '75px' }}></img>
        </div>  
    </div>
  )
}

export default AppDownload

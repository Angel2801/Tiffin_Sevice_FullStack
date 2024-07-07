import React from 'react'
import './ExploreMenu.css'
import { provider_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore Our Tiffin Services</h1>
        <p className='explore-menu-text'>Delivering more than just meals – nourishing connections, one tiffin at a time</p>
        <div className='explore-menu-list'>
            {provider_list.map((item,index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.provider_name?"All":item.provider_name)} key={index} className='explore-menu-list-item'>
                        <img className={category===item.provider_name?"active":""} src={item.logo} alt="" style={{ width:'150px', height: '150px' }}></img>
                        <p>{item.provider_name}</p>
                    </div>
                )
            }
            )}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu

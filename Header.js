import React from 'react'

import "./Header.css"

function Header() {
  const nav_titles =[{
    path:'/',display:'Home'
  },
  {
    path:'/',display:'Services'
  },
  {
    path:'/',display:'Courses'
  },
  {
    path:'/',display:'About Us'
  }]
  return (
    <header classname='header'>
    <div className='container'>

    <div className='nav_container'>
        <div className='logo'>
            <div className='logo-img'>
              <img src="" alt/>
            </div>
            <h2>TIMEGEN</h2>
        </div>
        <div className='navigation'>
          <ul className='menu'>
          {
            nav_titles.map((item)=>(
              <li className='nav_item'>{item.display}</li>

            ))
          }
            
          </ul>
        </div>
    </div>

    </div>
    </header>
  )
}

export default Header

import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className='footer'>
    <div className='container'>
    <div className='footer_wrapper'>
    <div className='footer-box'>
        <h2>TIMEGEN</h2>
        <p>this automatic tt generator is efficient and produces user requirements easily</p>
    </div>
    <div className='footer-box'>
    <h4 className='footer-title'>Company</h4>
      <ul className='footer_links'>
        <li>
          <a href="">our programs</a>
        </li>
        <li>
        <a href="#">our plan</a>
        </li>
        <li>
          <a href='#'>Try it</a>
        </li>
      </ul>
    </div>
    <div className='footer-box'>
    <h4 className='footer-title'>Quick links</h4>
      <ul className='footer_links'>
        <li>
          About us
        </li>
        <li>
          Contact us
        </li>
        <li>
          Support us
        </li>
      </ul>
    </div>
    </div>
  
    </div>

    </footer>
  )
}

export default Footer

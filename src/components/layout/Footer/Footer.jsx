import React from 'react'
import appstore from '../../../images/appstore.png'
import playstore from '../../../images/playstore.png'
import './footer.css'
export const Footer = () => {
  return (
    <footer id='footer'>
    <div className="leftfooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and mobile phone</p>
        <img src={playstore} alt="playstore"/>
        <img src={appstore} alt="AppStore"/>
    </div>
    <div className='midfooter'>
        <h1>Surshaa LifeStyle</h1>
        <p>High Quality is Our First priority</p>
        <p>Copyright 2023 &copy; Surshaa</p>
    </div>
    <div className='rightfooter'>
        <h4>Follow us</h4>
        <a href="https://github.com/">Instagram</a>
        <a href="https://github.com/">Youtube</a>
        <a href="https://github.com/">Facebook</a>
        <a href="https://github.com/">Gmail</a>
    </div>
    
    
    </footer>
  )
}

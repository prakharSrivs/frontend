import React, { useState } from 'react'
import './header.css'
import { useLocation, useNavigate } from 'react-router-dom';

function Header({currRoute}) {

    const navigate = useNavigate();

  return (
    <div className='headerContainer headerBg'>
        <div className="headerImage">
            <img src='/FlipCoin.png'  alt='Flipcoin Image' />
        </div>
        <div className="headerContent">
            <div className="boldHeading">
                Flip
                <span className="yellow">Coin</span>
            </div>
            <span className="lightHeading">
                Store
            </span>
        </div>
        <div className="coinBalance">
            114 <img src='/flipCoin.png' width={40} alt='flipcoin image'/>
        </div>
        <div className="headerButtons">
            <div className="headerButton" onClick={()=> navigate('/rewards')}>
                Redeem
            </div>
            <div className="headerButton" onClick={()=> navigate('/transactions')}>
                Transactions
            </div>
            <div className="headerButton" onClick={()=> navigate('/refer')}>
                Refer and Earn
            </div>
        </div>
    </div>
  )
}

export default Header
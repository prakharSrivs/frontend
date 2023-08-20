import React, { useState } from 'react'
import './header.css'
import { useLocation, useNavigate } from 'react-router-dom';
const ethers = require("ethers")

function Header({contractState,balance,setBalance,setLoading,setLoadingMessage}) {

    const navigate=useNavigate();

    const allocateFreeTokens =async ()=>{
        setLoadingMessage("Allocating 100 Tokens ");
        setLoading(true);
        try{
        const {contract,signer}=contractState;
        await contract._mintTo(signer.address,ethers.parseEther("100"));
        const balanceBigInt=await contract._getBalance(signer.address);
        setBalance(ethers.formatEther(balanceBigInt));            
        }
        catch(e){
            alert(e.message);
        }
        setLoading(false);
    }

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
            {balance && balance.slice(0,balance.indexOf("."))} <img src='/FlipCoin.png' width={40} alt='flipcoin image'/>
        </div>
        <div className="headerButtons">
            <div className="headerButton" onClick={()=> navigate('/rewards')}>
                Redeem
            </div>
            <div className="headerButton" onClick={()=> navigate('/transactions')}>
                Transactions
            </div>
            <div className="headerButton" onClick={allocateFreeTokens}>
                Get Free Tokens
            </div>
        </div>
    </div>
  )
}

export default Header
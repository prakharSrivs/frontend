import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./Components/Header/Header";
import Store from "./Components/Store/Store";
import Redeem from "./Components/Redeem/Redeem";
import Passbook from "./Components/Passbook/Passbook";
import { useEffect, useState } from "react";
//Contract Imports
import contractJson from './Contract/FlipCoin.json'
const ethers = require("ethers")

function App() {

  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null,
  })

  useEffect(()=>{
      const connectWallet = async ()=>{
          const contractAddress = "0xE61C91EFe981cA5Cb4cE630dfAa0Cf52b8c75BCE";
          const contractAbi=contractJson.abi;
          try{
            const {ethereum}=window;
            if(ethereum){
              const account = await ethereum.request({method:"eth_requestAccounts",});
              const provider = new ethers.BrowserProvider(ethereum);
              const signer =await provider.getSigner();
              const contract = new ethers.Contract(contractAddress,contractAbi,signer);
              setState({
                provider,
                signer,
                contract
              })
            }
            else {
              alert("Metamask wallet is required to continue forward")
            }
          }
          catch(e){
            console.log(e);
            alert(e.message);
          }
      }
      connectWallet();
      console.log(state)
  },[])

  return (
    <div className="App">
    <BrowserRouter>
    <Header currRoute={window.location.pathname}/>
      <Routes>
        <Route path='/' element ={<Store/>}/>
        <Route path='/rewards' element ={<Store/>}/>
        <Route path='/transactions' element ={<Passbook/>}/>
        <Route path='/refer' element ={<Redeem/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

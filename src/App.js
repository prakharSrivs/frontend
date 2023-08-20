import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./Components/Header/Header";
import Store from "./Components/Store/Store";
import Redeem from "./Components/Redeem/Redeem";
import Passbook from "./Components/Passbook/Passbook";
import { useEffect, useState } from "react";
import './App.css'
//Contract Imports
import contractJson from './Contract/FlipCoin.json'
const ethers = require("ethers")

function App() {

  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null,
  })
  const [user,setUser]=useState();
  const [balance,setBalance]=useState();
  const [transactions,setTransactions]=useState();
  const [loading,setLoading]=useState(false);
  const [loadingMessage,setLoadingMessage]=useState("CONNECTING METAMASK");

  useEffect(()=>{
      setLoading(true);
      const connectWallet = async ()=>{
          const contractAddress = "0x79361a6fda6d06b08ec89e46c6c48eee401b73da";
          const contractAbi=contractJson.abi;
          try{
            const {ethereum}=window;
            if(ethereum){
              const account = await ethereum.request({method:"eth_requestAccounts",});
              const provider = new ethers.BrowserProvider(ethereum);
              const signer =await provider.getSigner();
              const contract = new ethers.Contract(contractAddress,contractAbi,signer);
              const balanceBigInt=await contract._getBalance(signer.address);
              setBalance(ethers.formatEther(balanceBigInt));
              setState({
                provider,
                signer,
                contract
              })
              setLoading(false);
            }
            else {
              setLoadingMessage("Metamask wallet is required to continue forward")
            }
          }
          catch(e){
            console.log(e);
            setLoadingMessage(e.message);
          }
      }
      connectWallet();
  },[])

  if(loading==true)
  return(
    <div className="App">
      <div className="fullScreen">
      <div className="headerImage">
            <img src='/FlipCoin.png'  alt='Flipcoin Image' className="rotateAnimations"/>
            <div className="headerContent">
            <div className="boldHeading loading">
                Flip
                <span className="yellow">Coin</span>
            </div>
          </div>
        </div>
        <img src="MetaMask_Fox.svg.png" height={"100px"} className="metaMask"/>
        <div className="headerContent loadingMessage">
          {loadingMessage}
        </div>
      </div>
    </div>  
  )

  return (
    <div className="App">
    <BrowserRouter>
    <Header 
      currRoute={window.location.pathname} 
      balance={balance} 
      setBalance={setBalance}
      contractState={state}
      setLoading={setLoading}
      setLoadingMessage={setLoadingMessage}  
    />
      <Routes>
        <Route path='/' element ={<Store balance={balance} contractState={state} setBalance={setBalance}/>}/>
        <Route path='/rewards' element ={<Store balance={balance} contractState={state} setBalance={setBalance}/>}/>
        <Route path='/transactions' element ={<Passbook balance={balance} contractState={state} setBalance={setBalance}/>}/>
        <Route path='/refer' element ={<Redeem balance={balance} setLoading={setLoading} setLoadingMessage={setLoadingMessage} contractState={state} setBalance={setBalance}/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useState } from 'react'
import './store.css'
const ethers = require("ethers")

function Store({contractState,balance,setBalance}) {

  const [loading,setLoading]=useState(false);
  const [products,setProducts]=useState(
                [ {productImage:"/cleartrip.webp",productCost:100,isBought:false},
                  {productImage:"/makemytrip.jpg",productCost:100,isBought:false},
                  {productImage:"/makemytrip.jpg",productCost:100,isBought:false},
                  {productImage:"/oyo.svg",productCost:50,isBought:false},
                  {productImage:"/oyo.svg",productCost:50,isBought:true},
                  {productImage:"/oyo.svg",productCost:50,isBought:false},
                ]);


  const updateBalance=async (contract,signer)=>{
    const balanceBigInt=await contract._getBalance(signer.address);
    setBalance(ethers.toNumber(balanceBigInt));
  }

  const handleBuyButtonClick=async (index)=>{
    const tempProducts=products;
    const {contract,signer}=contractState;
    setLoading(true);
    window.scrollTo(0,0); 
    const product=products[index];
    if(product.productCost>balance){
      alert("Insufficient Fund");
    }
    else{
      try{
        const productCost=product.productCost;
        await contract._burnToken(signer.address,ethers.parseEther(productCost.toString()));
        product.isBought=true;
        setProducts((previousProducts)=>{
          return [...products.slice(0,index),product,...products.slice(index+1)]
        })
        updateBalance(contract,signer);
      }
      catch(e){
        alert(e.message);
      }
    }
    setLoading(false);
  }

  return (
    <div className='storeContainer'>
        {
          loading && 
          <div className="loader"></div>
        }
        <div className="products">
            {
              products.map((product,index)=>{
                return(
                  <div className="product">
                      <div className="productImageContainer" >
                        <img src={product.productImage}  className='productImage' width={"300px"}/>
                      </div>
                      <div className="productDetails"> 
                        <div 
                          className={product.isBought?"productCost bought":"productCost"}
                          onClick={()=> handleBuyButtonClick(index)}
                        >
                        {
                          product.isBought ?
                          "CLAIMED" :
                          <>
                          Claim for   
                          {" "+product.productCost}<img src='flipCoinSmalll.png' width={"30px"}/>
                          </>
                        }
                        </div>                 
                      </div>
                  </div>
                )
              })
            }

        </div>
    </div>
  )
}

export default Store
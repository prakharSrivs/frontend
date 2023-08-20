import React, { useEffect, useState } from 'react'
import './passbook.css'
import Transaction from './Transaction';
const ethers = require('ethers')

function Passbook({contractState,setLoading,setLoadingMessage,balance,setBalance}) {

  const transactions=[{amount:100,amountType:"D"},{amount:200,amountType:"C"},{amount:100,amountType:"D"},{amount:200,amountType:"C"}]
  const [allTransactions,setAllTransactions]=useState([]);


  useEffect(()=>{
    const fetchTransaction = async()=>{
      const {contract,signer}=contractState;
      if(contract!=null)
      {
        try{
          const {transactionTypes,fromAddresses,toAddresses,amounts,timestamps}=await contract.getAllTransactions(signer.address);
          let n=transactionTypes.length;
          let tempAllTransactions=[];
          for(let i=0;i<n;i++)
          {
            let transactionType=transactionTypes[i];
            let fromAddress=fromAddresses[i]=="0x0000000000000000000000000000000000000000"?"flipkart":fromAddresses[i];
            let toAddress=toAddresses[i]=="0x0000000000000000000000000000000000000000"?"flipkart":toAddresses[i];
            let amount=ethers.formatEther(amounts[i]);
            let timestamp=timestamps[i];
            tempAllTransactions.push({transactionType,fromAddress,toAddress,amount,timestamp})
          }
          tempAllTransactions.reverse();
          setAllTransactions(tempAllTransactions);
        }
        catch(e){
          alert(e.message);
        }
      }
    }
    fetchTransaction()
  },[])


  return (
    <div className='passbookContainer'>
    <div className="passbook">
        <div className='headerContent BoldHeading passbookHeading'>Transactions</div>
          <div className="transactions">
            {
              allTransactions.map((transaction,index)=>{
                 return <Transaction key={index} transaction={transaction} />
              })
            }
          </div>
    </div>      
    </div>
  )
}

export default Passbook
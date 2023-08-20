import React from 'react'
import './passbook.css'

function Passbook() {

  const transactions=[{amount:100,amountType:"D"},{amount:200,amountType:"C"},{amount:100,amountType:"D"},{amount:200,amountType:"C"}]

  return (
    <div className='passbookContainer'>
    <div className="passbook">
        <div className='headerContent BoldHeading passbookHeading'>Transactions</div>
          <div className="transactions">
            <div className="transaction red"><div className="amount">-200</div><div className="amountType">DEBIT</div></div>
            <div className="transaction green"><div className="amount">-200</div><div className="amountType">DEBIT</div></div>
            <div className="transaction green"><div className="amount">-200</div><div className="amountType">DEBIT</div></div>
            <div className="transaction red"><div className="amount">-200</div><div className="amountType">DEBIT</div></div>
          </div>
    </div>      
    </div>
  )
}

export default Passbook
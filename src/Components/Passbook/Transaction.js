import React from 'react'

function Transaction({transaction}) {
    console.log(transaction)
    if(transaction.transactionType=="credit")
    return (
        <div className="transaction green">
            <div className='row'>
                <div className="amount">{transaction.amount}</div>
                <div className="amountType">{transaction.transactionType.toUpperCase()}</div>
            </div>
            <div className='row'>
                <div className="amount address">{"From "+transaction.fromAddress}</div>
                <div className="amountType address">{"To :"+transaction.toAddress}</div>
            </div>
        </div>
    )
    else 
    return (
        <div className="transaction red">
            <div className='row'>
                <div className="amount">{transaction.amount}</div>
                <div className="amountType">{transaction.transactionType.toUpperCase()}</div>
            </div>
            <div className='row'>
                <div className="amount address">{"From "+transaction.fromAddress}</div>
                <div className="amountType address">{"To :"+transaction.toAddress}</div>
            </div>
        </div>
    )

}

export default Transaction
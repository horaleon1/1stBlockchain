const Transaction = require('./transaction');

class TransactionPool{
  constructor(){

    this.transactionMap = {};



    //TODO: me falta esta madre
  }
  setTransaction(transaction){
    this.transactionMap[transaction.id] = transaction;
  }
  setMap(transactionMap){
    this.transactionMap = this.transactionMap;
  }
  existingTransaction({ inputAddress }){
    const transactions = Object.values(this.transactionMap);

    return transactions.find(transaction => transaction.input.address === inputAddress);
  }
  validTransactions(){
    return Object.values(this.transactionMap).filter(transaction => Transaction.validTransaction(transaction));
  }
} 

module.exports = TransactionPool;
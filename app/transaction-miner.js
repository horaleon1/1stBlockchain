class TransactionMiner {
  constructor({ blockchain, transactionPool, wallet, pubsub }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.pubsub = pubsub;
  }
  mineTransactions() {
    //get the transactions pools valid  transactions
    //generate miner reward
    //add a block consisting of these transactions to the blockchain
    //broadcast the updated blockchain
    //clear the  pool
  }
}

module.exports = TransactionMiner;

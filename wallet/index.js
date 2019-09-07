const { STARTING_BALANCE } = require('../config');
const { ec, cryptoHash } = require('../utilities/index');
const Transaction = require('./transaction');

class Wallet {
 constructor(){
   this.balance = STARTING_BALANCE;

   //generate keys   
   this.keyPair = ec.genKeyPair();

   //check with no private key (getPublic)
   this.publicKey = this.keyPair.getPublic().encode('hex');
 }
  //check sign 
 sign(data){
   return this.keyPair.sign(cryptoHash(data));
 }

 createTransaction( {recipient, amount }) {
   if(amount > this.balance){
     throw new Error('Amount exceeds balance');
   }
   return new Transaction({ senderWallet: this, recipient, amount});
 }
};

module.exports = Wallet;
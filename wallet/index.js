const { STARTING_BALANCE } = require('../config');
const cryptoHash = require('../utilities/crypto-hash');
const { ec } = require('../utilities/index');

class Wallet {
 constructor(){
   this.balance = STARTING_BALANCE;

   this.keyPair = ec.genKeyPair();

   this.publicKey = this.keyPair.getPublic().encode('hex');
 }
 sign(data){
   return this.keyPair.sign(cryptoHash(data));
 }
 
};

module.exports = Wallet;
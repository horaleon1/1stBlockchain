const { STARTING_BALANCE } = require('../config');
const { ec } = require('../utilities/index');

class Wallet {
 constructor(){
   this.balance = STARTING_BALANCE;

   const keyPair = ec.genKeyPair();

   this.publicKey = keyPair.getPublic();
 }
}

module.exports = Wallet;
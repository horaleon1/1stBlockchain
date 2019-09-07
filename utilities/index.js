const EC = require('elliptic').ec; //signing transactions
const cryptoHash = require('./crypto-hash');

const ec = new EC('secp256k1');

const verifySignature = ({ publicKey, data, signature }) => {
  const keyFromPublic = ec.keyFromPublic(publicKey, 'hex');

  return keyFromPublic.verify(cryptoHash(data), signature);
};

console.log(verifySignature());

module.exports = { ec, verifySignature, cryptoHash }; 


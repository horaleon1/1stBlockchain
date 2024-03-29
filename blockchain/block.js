const { GENESIS_DATA, MINE_RATE } = require("../config");
const { cryptoHash } = require("../utilities/");
const hexToBinary = require('hex-to-binary');

class Block {
  constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce; //unique request code
    this.difficulty = difficulty; 
  }
  // first block of the blockchain
  static genesis() {
    return new this(GENESIS_DATA);
  }
  // creation of subsequent blocks 
  static mineBlock({ lastBlock, data }) {
  
    const lastHash = lastBlock.hash;
    let hash, timestamp;
    let { difficulty } = lastBlock;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({
        originalBlock: lastBlock,
        timestamp
      });
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
    } while (hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty));

    return new this({
      timestamp,
      lastHash,
      data,
      difficulty,
      nonce,
      hash
    });
  }

  //increase or decrease the difficulty if the blocks are creating too fast or too slow.
  static adjustDifficulty({ originalBlock, timestamp }) {

    const { difficulty } = originalBlock;

    const difference = timestamp - originalBlock.timestamp;

    if(difficulty < 1 ) return 1;

    if (difference > MINE_RATE) return difficulty - 1;

    return difficulty + 1;
  }
}

module.exports = Block;

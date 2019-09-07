const MINE_RATE = 1000;
const INITIAL_DIFFICULTY = 2;

//Data that will contain the first block
const GENESIS_DATA = {
  timestamp: 1,
  lastHash: '-----',
  hash: 'hash-one',
  difficulty: INITIAL_DIFFICULTY,
  nonce:0,
  data:[]
}; 

//Number of coins that will have each wallet (user) by default
const STARTING_BALANCE = 1000;

// no me acuerdo
const REWARD_INPUT = {
  address:'*authorized-reward*'
};

//Number of coins that the miner will received for mining new blocks
const MINING_REWARD = 50;

module.exports = { GENESIS_DATA, MINE_RATE, STARTING_BALANCE, REWARD_INPUT, MINING_REWARD };
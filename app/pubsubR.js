//redis provider 
const redis = require("redis");
//feeding the information
const CHANNELS = {
  TEST: "TEST",
  BLOCKCHAIN: "BLOCKCHAIN",
  TRANSACTION: "TRANSACTION"
};

class PubSub {
  constructor({ blockchain, transactionPool }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;

    //build-in methods Redis
    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    this.subscribeToChannels();

    this.subscriber.on("message", (channel, message) =>
      this.handleMessage(channel, message)
    );
  }

  //
  handleMessage(channel, message) {
    // console.log(`Message received, Channel: ${channel}. Message: ${message}.`);

    const parsedMessage = JSON.parse(message);

    if (channel === CHANNELS.BLOCKCHAIN) {
      this.blockchain(parsedMessage);
    } else if (channel === CHANNELS.TRANSACTION) {
      this.transactionPool.setTransaction(parsedMessage);
    }
  }

  subscribeToChannels() {
    Object.values(CHANNELS).forEach(channel => {
      this.subscriber.subscribe(channel);
    });
  }
  publish({ channel, message }) {
    this.subscriber.unsubscribe(channel, () => {
      this.publisher.publish(channel, message, () => {
        this.subscriber.subscribe(channel);
      });
    });
  }
  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain)
    });
  }
  broadcastTransaction(transaction) {
    this.publish({
      channel: CHANNELS.TRANSACTION,
      message: JSON.stringify(transaction)
    });
  }
}
module.exports = PubSub;

// const testPubSub = new PubSub();

// setTimeout(() => testPubSub.publisher.publish(CHANNELS.TEST, "FOO"), 1000);

const PubNub = require("pubnub");

const credentials = {
  publishKey: "pub-c-72514c82-5920-4012-9c15-0c6b9553e8cc",
  subscribeKey: "sub-c-f1eb0530-ccfd-11e9-adf5-366022f02051",
  secretKey: "sec-c-NGY3YmNkMjctYzFlOS00NmY1LTg1MDEtNmViNjdiNjNmZWQ1"
};
const CHANNELS = {
  TEST: "TEST"
};

class PubSub {
  constructor() {
    this.pubnub = new PubNub(credentials);

    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });

    this.pubnub.addListener(this.listener());
  }
  listener() {
    return {
      message: messageObject => {
        const { channel, message } = messageObject;
        console.log(
          `Message received, Channel: ${channel}, Message: ${message}`
        );
      }
    };
  }
  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }
}

const testPubSub = new PubSub();
testPubSub.publish({ channel: CHANNELS.TEST, message: "hello pubnub" });

module.exports = PubSub;

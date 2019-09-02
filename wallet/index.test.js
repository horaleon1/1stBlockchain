const Wallet = require('./index');

describe('Wallet', () => {
  let wallet;

  beforeEach( () => {
    wallet = new Wallet();
  });

  it('has a `balance`', () => {
    expect(wallet).toHaveProperty('balance');
  });
  it('hash a `publicKey`', () => {
    console.log(wallet.publicKey);
    expect(wallet).toHaveProperty('publicKey');
  });
})
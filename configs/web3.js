const Web3 = require("web3");
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const WEBSOCKET_INFURA_URL = `wss://mainnet.infura.io/ws/v3/${INFURA_PROJECT_ID}`;
const HTTP_INFURA_URL = `wss://mainnet.infura.io/ws/v3/${INFURA_PROJECT_ID}`;

/**
 * @dev creates Web3 instance with websocket connection using infura's rpc url
 */
class Web3WebsocketInitializer {
  constructor() {
    const options = {
      timeout: 30000, // ms

      clientConfig: {
        // Useful to keep a connection alive
        keepalive: true,
        keepaliveInterval: 60000, // ms
      },

      // Enable auto reconnection
      reconnect: {
        auto: true,
        delay: 5000, // ms
        maxAttempts: 5,
        onTimeout: false,
      },
    };

    this.web3 = new Web3(
      new Web3.providers.WebsocketProvider(WEBSOCKET_INFURA_URL, options)
    );
  }
}

/**
 * @dev creates Web3 instance with http connection using infura's rpc url
 */
class Web3HTTPInitializer {
  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider(HTTP_INFURA_URL));
  }
}

module.exports = { Web3WebsocketInitializer, Web3HTTPInitializer };

import { TYPES } from "./reducer";

export default function actions(state, dispatch = () => {}) {
  /************************************/
  /************************************/
  const { Web3, web3Modal, web3Instance } = state;
  /************************************/
  /************************************/

  const loadWeb3 = async () => {
    const { default: web3 } = await import(
      "web3"
      /* webpackPreload: true */
      /* webpackChunkName: "web3" */
    );
    dispatch({
      type: TYPES.WEB_3_LOADED,
      payload: web3,
    });
  };

  const initializeWeb3Modal = async () => {
    let web3Modal = import(
      "web3modal"
      /* webpackPreload: true */
      /* webpackChunkName: "web3modal" */
    );
    let WalletConnectProvider = import(
      "@walletconnect/web3-provider"
      /* webpackPreload: true */
      /* webpackChunkName: "web3-provider" */
    );

    [{ default: web3Modal }, { default: WalletConnectProvider }] =
      await Promise.all([web3Modal, WalletConnectProvider]);

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required

        options: {
          chainId: 1,
          infuraId: "492228b49c254865adaada0fdfe1f884", // required
          rpc: {
            1: "https://mainnet.infura.io/v3/492228b49c254865adaada0fdfe1f884", // mainnet ethereum
            4: "https://rinkeby.infura.io/v3/492228b49c254865adaada0fdfe1f884", // Rinkeby Test Network
            56: "https://bsc-dataseed.binance.org/", // BSC
            97: "https://data-seed-prebsc-2-s1.binance.org:8545", // BSC Testnet
            137: "https://polygon-mainnet.g.alchemy.com/v2/ma3nP6ZZCpI81yCWIBz2fPOD2BNBrVP5", // Polygon
            250: "https://rpc.ftm.tools", // Fantom
            4002: "https://rpc.testnet.fantom.network", // Fantom Testnet
            42161: "https://arb1.arbitrum.io/rpc", // Arbitrum
            80001: "https://rpc-mumbai.matic.today", // Mumbai
            421611: "https://rinkeby.arbitrum.io/rpc", // Arbitrum Testnet Rinkeby
          },
        },
      },
    };
    web3Modal = new web3Modal({
      cacheProvider: false, // optional
      providerOptions,
    });

    dispatch({
      type: TYPES.INII_WEB3_MODAL,
      payload: web3Modal,
    });
  };

  const getSignature = async (message, account, _web3Instance) => {
    _web3Instance = web3Instance || _web3Instance;
    return await _web3Instance.eth.personal.sign(
      _web3Instance.utils.fromUtf8(message),
      account
    );
  };

  const connectWallet = async ({ message = null, onSuccess = () => null }) => {
    if (!web3Modal) return;
    try {
      const provider = await web3Modal.connect();

      const web3Instance = new Web3(provider);

      let account = await web3Instance.eth.getAccounts();
      if (!account) {
        await provider.request({ method: "eth_requestAccounts" });
        account = await web3Instance.eth.getAccounts();
      }

      account = account[0];
      let signature = null;
      let _message = account;
      if (message) _message = message;

      signature = await getSignature(_message, account, web3Instance);

      dispatch({
        type: TYPES.WALLET_CONNECTED,
        payload: { web3Instance, account: account, provider },
      });

      onSuccess({ message: _message, signature, wallet: account });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    contextState: state,
    dispatch,
    loadWeb3,
    initializeWeb3Modal,
    connectWallet,
    getSignature,
  };
}

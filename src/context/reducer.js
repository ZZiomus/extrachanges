export const TYPES = {
  WEB_3_LOADED: "WEB_3_LOADED",
  WALLET_CONNECTED: "WALLET_CONNECTED",
  UPDATE_CONNECTED_WALLET: "UPDATE_CONNECTED_WALLET",
  INII_WEB3_MODAL: "INII_WEB3_MODAL",
};
// state of the application
export const initialState = {
  account: null,
  isWalletConnected: false,

  provider: null,

  Web3: null,
  Web3Instance: null,
  isWeb3InstanceCreated: false,
  web3Modal: null,
};

export default function reducer(state, action) {
  switch (action.type) {
    case TYPES.INII_WEB3_MODAL:
      return {
        ...state,
        web3Modal: action.payload,
      };

    case TYPES.WEB_3_LOADED:
      return {
        ...state,
        Web3: action.payload,
      };

    case TYPES.WALLET_CONNECTED:
      return {
        ...state,
        ...action.payload,
        isWalletConnected: true,
        isWeb3InstanceCreated: true,
      };

    case TYPES.UPDATE_CONNECTED_WALLET:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

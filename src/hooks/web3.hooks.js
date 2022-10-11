import { useEffect } from "react";
import { Web3UserContext } from "../context";
import { TYPES } from "../context/reducer";

export const useInitWeb3Modal = () => {
  const { initializeWeb3Modal } = Web3UserContext();
  useEffect(() => {
    initializeWeb3Modal();
  }, []);
};

export const useLoadWeb3 = () => {
  const { loadWeb3 } = Web3UserContext();
  useEffect(() => {
    loadWeb3();
  }, []);
};

/**
 * @note this hook should only be called inside the Web3Context. otherwise it will not work properly
 * @dev  this custom hook will run when the webpage loads. it will listen for changes in network (blockchain network) and account.
 */
export const useAddWeb3ProviderListners = () => {
  const {
    dispatch,
    contextState: { provider, web3Instance },
  } = Web3UserContext();
  useEffect(() => {
    if (!provider) return;
    provider.on("accountsChanged", async (accounts) => {
      let payload = {
        isWalletConnected: false,
        account: null,
      };
      if (accounts && accounts.length) {
        const _accounts = await web3Instance.eth.getAccounts();
        payload = { isWalletConnected: true, account: _accounts[0] };
      }
      localStorage.removeItem("hpx-web-token");
      dispatch({
        type: TYPES.UPDATE_CONNECTED_WALLET,
        payload: payload,
      });
    });
    //  network event listeners
    provider.on("chainChanged", async (chainId) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);
};

import { useEffect } from "react";
import { Web3UserContext } from "../context";
import { TYPES } from "../context/reducer";
import { checkSession } from "../services/apis";

export const useSession = () => {
  const { dispatch } = Web3UserContext();
  useEffect(() => {
    (async () => {
      try {
        const res = await checkSession();

        dispatch({
          type: TYPES.UPDATE_CONNECTED_WALLET,
          payload: { isWalletConnected: true, account: res.wallet },
        });
      } catch (err) {}
    })();
  }, []);
};

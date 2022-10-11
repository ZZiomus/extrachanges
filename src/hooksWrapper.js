import { useSession } from "./hooks/useSession";
import {
  useAddWeb3ProviderListners,
  useInitWeb3Modal,
  useLoadWeb3,
} from "./hooks/web3.hooks";

const HooksWrapper = () => {
  useInitWeb3Modal();
  useLoadWeb3();
  useAddWeb3ProviderListners();
  useSession();
  return null;
};

export default HooksWrapper;

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Web3UserContext } from "../context";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { joinWithReferralCode } from "../services/apis";

import {
  FirstTime,
  Connect,
  FAQs,
  JoinWithUs,
  Footer,
  HeroSection,
} from "../components/join-referral";
import { Header } from "../components";

export default function JoinReferral() {
  useScrollToTop();

  let setTimeoutId = useRef(null);

  let isComponentMount = useRef(false);

  useEffect(() => {
    isComponentMount.current = true;

    return () => {
      isComponentMount.current = false;
    };
  }, []);

  const { code } = useParams();

  const [{ isError, isSuccess, reason, isWalletConnected, account }, setState] =
    useState({
      isError: false,
      isSuccess: false,
      reason: null,
      isWalletConnected: false,
      account: null,
    });

  const { connectWallet } = Web3UserContext();

  const onWalletConnect = () => {
    const message = `Welcome to HPX referral!\n\nPlease sign this message to join with referral code. This request will not trigger a blockchain transaction or cost any gas fees.\n\Referral code: ${code}`;
    const onSuccess = async ({ message, signature, wallet }) => {
      try {
        setState((p) => ({ ...p, isWalletConnected: true, account: wallet }));
        const payload = { message, signature };
        await joinWithReferralCode(payload, code);

        return window.open(`/sacrifice`, "_self");
      } catch (error) {
        let message = error.message || error;

        if (error.response.status == 400) {
          message = error.response.data.message;
        }

        setState((p) => ({
          ...p,
          isError: true,
          reason: message,
        }));

        clearTimeout(setTimeoutId);

        setTimeoutId = setTimeout(() => {
          if (isComponentMount.current) {
            setState((p) => ({
              ...p,
              isError: false,
              reason: null,
            }));
          }
        }, 3500);
      }
    };

    connectWallet({ onSuccess, withSignature: true, message });
  };

  return (
    <>
      <Header />
      <HeroSection />
      <FirstTime />
      <Connect onConnect={onWalletConnect} isError={isError} reason={reason} />
      <FAQs />
      <JoinWithUs />
      <Footer />
    </>
  );
}

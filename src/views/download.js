import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Web3UserContext } from "../context";
import { useScrollToTop } from "../hooks/useScrollToTop";
import Layout from "../layout/main.layout";
import { downloadAllAddressesCSV } from "../services/apis";
import { shortenAddress } from "../utils/constatns";

export default function Download() {
  useScrollToTop();

  let setTimeoutId = useRef(null);

  let isComponentMount = useRef(false);

  useEffect(() => {
    isComponentMount.current = true;

    return () => {
      isComponentMount.current = false;
    };
  }, []);

  const [
    { isError, isSuccess, reason, isWalletConnected, account, link },
    setState,
  ] = useState({
    isError: false,
    isSuccess: false,
    reason: null,
    isWalletConnected: false,
    account: null,
    link: null,
  });

  const { connectWallet } = Web3UserContext();

  const onWalletConnect = () => {
    const message = `Welcome to HPX referral!\n\nPlease sign this message to download addresses. This request will not trigger a blockchain transaction or cost any gas fees.`;
    const onSuccess = async ({ message, signature, wallet }) => {
      try {
        setState((p) => ({ ...p, isWalletConnected: true, account: wallet }));
        const payload = { message, signature };
        const res = await downloadAllAddressesCSV(payload);

        setState((p) => ({
          ...p,
          isSuccess: true,
          link: res.link || res,
        }));
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
    <Layout>
      <main>
        {/* <!-- refer-area --> */}
        <section className="refer refer-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-xl-9 mx-auto">
                <div className="desc desc-refer text-center">
                  <div className="desc-connect box mt-0">
                    <img
                      src="assets/img/connect.png"
                      className="img-fluid"
                      alt=""
                    />

                    {!isWalletConnected && (
                      <div className="desc-connect__desc">
                        <p className="fw-600">
                          Please connect your metamask wallet to download
                          addresses
                        </p>
                        <span className="btn" onClick={onWalletConnect}>
                          Connect
                        </span>
                      </div>
                    )}

                    {isWalletConnected && (
                      <div className="desc-joind ">
                        <div className="desc-joind__item d-flex align-items-center justify-content-between">
                          <div className="desc-joind__item-count">
                            <p>Wallet</p>
                          </div>
                          <div className="desc-joind__item-title">
                            <p>{shortenAddress(account)}</p>
                          </div>
                        </div>

                        {isError && <p className="alert-danger">{reason}</p>}

                        {isSuccess && (
                          <>
                            <p>
                              Please click the on the link below to download the
                              file.
                            </p>

                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              download CSV file
                            </a>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- refer-area-end --> */}
      </main>
    </Layout>
  );
}

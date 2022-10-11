import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Web3UserContext } from "../context";
import { useScrollToTop } from "../hooks/useScrollToTop";
import Layout from "../layout/main.layout";
import {
  createOrGetReferralInfo,
  getConnectedWalletinfo,
} from "../services/apis";
import { shortenAddress } from "../utils/constatns";

export default function ReferralHome() {
  useScrollToTop();

  let navigate = useNavigate();

  const {
    connectWallet,
    getSignature,
    contextState: { isWalletConnected, account },
  } = Web3UserContext();

  const [{ isUserInfoLoading, userInfo }, setState] = useState({
    isUserInfoLoading: false,
    userInfo: {},
  });

  useEffect(() => {
    const onSuccess = async (payload) => {
      setState((p) => ({ ...p, isUserInfoLoading: true }));

      try {
        const { accessToken, userInfo } = await getConnectedWalletinfo(payload);
        localStorage.setItem("hpx-web-token", accessToken);

        setState((p) => ({ ...p, userInfo }));
      } catch (error) {
        console.log(error);
      }
      setState((p) => ({ ...p, isUserInfoLoading: false }));
    };

    account && onSuccess(account);
  }, [account]);

  const onConnect = () => {
    connectWallet({});
  };

  const onCreateReferralLink = async () => {
    try {
      const message = `Welcome to HPX referral!\n\nPlease sign this message to create referral link. This request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address: ${account}`;
      const signature = await getSignature(message, account);

      const payload = { message, signature };

      const {
        accessToken,
        userInfo: { wallet },
      } = await createOrGetReferralInfo(payload);

      console.log(this);

      localStorage.setItem("hpx-web-token", accessToken);
      return redirectToReferralsListPage(wallet);
    } catch (err) {
      console.log(err);
    }
  };

  const redirectToReferralsListPage = (account) => {
    navigate(`/referral/home/${account}`);
  };
  return (
    <>
      <Layout>
        <main>
          {/* <!-- refer-area --> */}
          <section className="refer refer-padding">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="desc desc-refer text-center">
                    <h1 className="gd-text">Refer A Friend</h1>
                    <p className="fw-600">
                      Join the "Hpx love" referral program below to potentially
                      earn bonus sacrifice points.
                    </p>
                    <div className="desc-img">
                      <img src="assets/img/refer-1.png" alt="" />
                    </div>
                    <hr />
                    <p>
                      Click the icon below to connect and authenticate your
                      MetaMask wallet and you’ll recieve your referral link on
                      the next page If you do not have a MetaMask account or
                      installed on this browser, please click here to.
                      <a href="" className="gd-link fw-600">
                        install it now
                      </a>
                    </p>
                    {!isWalletConnected && (
                      <div className="row">
                        <div className="col-lg-10 mx-auto">
                          <div className="desc-connect box">
                            <img
                              src="assets/img/connect.png"
                              className="img-fluid"
                              alt=""
                            />
                            <div className="desc-connect__desc">
                              <p className="fw-600">
                                Please connect your metamask wallet
                              </p>
                              <span onClick={onConnect} className="btn">
                                Connect
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {isWalletConnected && (
                      <div className="desc-joind box">
                        {isUserInfoLoading && (
                          <p className="fw-600">Loading wallet info...</p>
                        )}

                        {!isUserInfoLoading &&
                          Object.keys(userInfo).length > 0 && (
                            <div className="desc-joind box">
                              <div className="desc-joind__items text-start">
                                <div className="desc-joind__item d-flex align-items-center justify-content-between">
                                  <div className="desc-joind__item-count">
                                    <p>Wallet</p>
                                  </div>
                                  <div className="desc-joind__item-title">
                                    <p>{shortenAddress(account)}</p>
                                  </div>
                                </div>

                                {userInfo.type === "referrer" && (
                                  <>
                                    <div className="desc-joind__item d-flex align-items-center justify-content-between">
                                      <div className="desc-joind__item-count">
                                        <p>Referral code</p>
                                      </div>
                                      <div className="desc-joind__item-title">
                                        <p>{userInfo.code}</p>
                                      </div>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-center">
                                      <span
                                        className="btn"
                                        onClick={redirectToReferralsListPage.bind(
                                          this,
                                          account
                                        )}
                                      >
                                        Referral list
                                      </span>
                                    </div>
                                  </>
                                )}

                                {userInfo.type == "referee" && (
                                  <p className="fw-600">
                                    Already connected wallet wallet refferal
                                    code. Not eligible for Refferal link.
                                  </p>
                                )}

                                {userInfo.type !== "referrer" &&
                                  userInfo.message && (
                                    <div className="d-flex align-items-center justify-content-center">
                                      <div>
                                        <p className="fw-600">
                                          Welcome to HPX referral.
                                        </p>

                                        <span
                                          className="btn"
                                          onClick={onCreateReferralLink}
                                        >
                                          Create referral link
                                        </span>
                                      </div>
                                    </div>
                                  )}
                              </div>
                            </div>
                          )}
                      </div>
                    )}

                    <p className="mb-2">
                      Got Questions? Join Over 8.000 Members in Our Telegram -
                      <a href="" className="gd-link fw-600">
                        Ask The Here
                      </a>
                    </p>
                    <p>
                      To Read More About The Sacrifice -
                      <a href="" className="gd-link fw-600">
                        Click Here
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- refer-area-end --> */}
        </main>
      </Layout>
    </>
  );
}

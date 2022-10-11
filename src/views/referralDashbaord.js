import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useScrollToTop } from "../hooks/useScrollToTop";
import Layout from "../layout/main.layout";
import { getWalletReferrals } from "../services/apis";
import {
  EmailShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { shortenAddress } from "../utils/constatns";

export default function Referral() {
  useScrollToTop();
  const BASE_URL = window.location.origin;
  const perPage = 10;
  const { wallet } = useParams();

  const [
    { referees, refereesPerPage, shareLink, totalPages, currentPage },
    setState,
  ] = useState({
    referees: [],
    refereesPerPage: [],
    shareLink: `${BASE_URL}/referral/`,
    totalPages: 0,
    currentPage: 0,
  });

  const onCopy = () => {
    navigator.clipboard.writeText(shareLink);
  };

  // pagination previous
  const onPrevious = () => {
    let newPage = currentPage - 1;

    if (newPage < 0) return;

    const refereesPerPage = referees.slice(
      newPage * perPage,
      newPage * perPage + perPage
    );

    setState((p) => ({
      ...p,
      refereesPerPage,
      currentPage: newPage,
    }));
  };

  // pagination next
  const onNext = () => {
    let newPage = currentPage + 1;

    if (newPage >= totalPages) return;

    const refereesPerPage = referees.slice(
      newPage * perPage,
      newPage * perPage + perPage
    );

    setState((p) => ({
      ...p,
      refereesPerPage,
      currentPage: newPage,
    }));
  };

  useEffect(() => {
    (async () => {
      const res = await getWalletReferrals(wallet);

      const _referees = res.referralInfo.referees;

      const totalPages = Math.floor(_referees.length / perPage);
      const refereesPerPage = _referees.slice(
        currentPage,
        (currentPage + 1) * perPage
      );

      setState((p) => ({
        ...p,
        referralInfo: res,
        shareLink: shareLink + res.referralInfo.code,
        totalPages,
        refereesPerPage,
        referees: _referees,
      }));
    })();
  }, [wallet]);

  return (
    <Layout>
      <main>
        {/* <!-- refer-area --> */}
        <section className="refer refer-padding">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="desc desc-refer text-center">
                  <h2 className="gd-text">Start to invite your friends</h2>
                  <p className="op-7">
                    Below your referral link you will see a blue circle with the
                    number of refferals you have been awarded <br />
                    Please bookmark this page so you can return to it whenever
                    you want an update on your referral count.
                  </p>

                  <div className="row">
                    <div className="col-lg-10 col-xl-9 mx-auto">
                      <div className="desc-share box">
                        <div className="desc-share__items">
                          <TelegramShareButton url={shareLink}>
                            <a>
                              <img src="assets/img/plane-gd.png" alt="" />
                            </a>
                          </TelegramShareButton>

                          <TwitterShareButton url={shareLink}>
                            <a>
                              <img src="assets/img/twitter-gd.png" alt="" />
                            </a>
                          </TwitterShareButton>

                          <LinkedinShareButton url={shareLink}>
                            <a>
                              <img src="assets/img/linkdin-gd.png" alt="" />
                            </a>
                          </LinkedinShareButton>

                          <WhatsappShareButton url={shareLink}>
                            <a>
                              <img src="assets/img/whats-app-gd.png" alt="" />
                            </a>
                          </WhatsappShareButton>

                          <a>
                            <img src="assets/img/share-gd.png" alt="" />
                          </a>

                          <EmailShareButton url={shareLink}>
                            <a>
                              <img src="assets/img/email-gd.png" alt="" />
                            </a>
                          </EmailShareButton>
                        </div>
                        <div className="desc-share__link">
                          <p className="fw-600 mb-4">Share your unique link</p>
                          <div className="desc-share__link-genaret">
                            <form action="">
                              <input type="text" value={shareLink} disabled />
                              <button type="button" onClick={onCopy}>
                                <img src="assets/img/copy-bord.png" alt="" />
                              </button>
                            </form>
                          </div>
                          <p className="mb-0">
                            <a href="" className="gd-link">
                              Invite your friends to get more referrals
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="desc-joind box">
                        <h3 className="gd-text">Friend who had joined</h3>
                        <div className="desc-joind__items text-start">
                          {refereesPerPage.length > 0 &&
                            refereesPerPage.map((referee, index) => (
                              <div
                                key={referee._id}
                                className="desc-joind__item d-flex align-items-center justify-content-between"
                              >
                                <div className="desc-joind__item-count">
                                  <p>{index + 1}</p>
                                </div>
                                <div className="desc-joind__item-title">
                                  <p>{shortenAddress(referee.wallet)}</p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {refereesPerPage.length > 0 && (
                    <div className="desc-pagination">
                      <ul className="d-flex align-items-center justify-content-center">
                        <li>
                          <a onClick={onPrevious}>
                            <img src="assets/img/arrow-left-white.png" alt="" />
                          </a>
                        </li>

                        {Array(totalPages)
                          .fill(0)
                          .map((_, index) => {
                            const pageId = index + 1;

                            return (
                              <li key={pageId}>
                                <a
                                  className={
                                    currentPage == index ? "active" : ""
                                  }
                                >
                                  {pageId}
                                </a>
                              </li>
                            );
                          })}

                        <li>
                          <a onClick={onNext}>
                            <img
                              src="assets/img/arrow-right-white.png"
                              alt=""
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
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

import React from "react";

export default React.forwardRef((props, ref) => {
  return (
    <>
      {/* <!-- join-area --> */}
      <section className="join join-padding bg-dark">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="join-content text-center">
                <h3>Join with us</h3>
                <div className="join-content__social">
                  <a href="">
                    <img src="assets/img/plane.png" alt="" />
                  </a>
                  <a href="">
                    <img src="assets/img/twitter.png" alt="" />
                  </a>
                  <a href="">
                    <img src="assets/img/youtube.png" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- join-area-end --> */}

      <footer class="footer bg-dark" ref={ref}>
        <div class="footer-border"></div>
        <div class="footer-top">
          <div class="container">
            <div class="row">
              <div class="col-lg-5">
                <div class="footer-text">
                  <a href="">
                    <img src="assets/img/footer-logo.png" alt="" />
                  </a>
                  <p>
                    Hpx will work like an Index for all nft’s on Pulsechain.
                    Once a nft trade is made thru our platform you will earn
                    yields each time a transaction is made, just like a
                    shareholder
                  </p>
                </div>
              </div>
              <div class="col-lg-7">
                <div class="row">
                  <div class="col-md-4">
                    <div class="footer-menu">
                      <h5>Explore</h5>
                      <ul>
                        <li>
                          <a href="">Sacrifice</a>
                        </li>
                        <li>
                          <a href="">Marketplace</a>
                        </li>
                        <li>
                          <a href="">HPX Air Drop</a>
                        </li>
                        <li>
                          <a href="">Elron</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="footer-menu">
                      <h5>Community</h5>
                      <ul>
                        <li>
                          <a href="">Home</a>
                        </li>
                        <li>
                          <a href="">Project Status</a>
                        </li>
                        <li>
                          <a href="">Value</a>
                        </li>
                        <li>
                          <a href="">Wallet</a>
                        </li>
                        <li>
                          <a href=""></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="footer-menu">
                      <h5>Company</h5>
                      <ul>
                        <li>
                          <a href="">About</a>
                        </li>
                        <li>
                          <a href="">Careers</a>
                        </li>
                        <li>
                          <a href="">Team</a>
                        </li>
                        <li>
                          <a href="">Location</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="container">
            <div class="row">
              <div class="col-6">
                <div class="footer-copy">
                  <p class="mb-0">© HPX All rights reserved.</p>
                </div>
              </div>
              <div class="col-6">
                <div class="footer-link text-end">
                  <a href="">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
});

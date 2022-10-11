import React from "react";

export default React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <div class="overlay"></div>

      {/* <!-- offcanvas-menu --> */}
      <div class="offcanvas-wrapper">
        <div class="offcanvas-header d-flex align-items-center justify-content-between">
          <div class="header-menu__lang ms-0">
            <div class="dropdown">
              <button
                class="dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="fl">
                  <img src="assets/img/fl.png" alt="" />
                </span>
                En
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a class="dropdown-item" href="#">
                    <span class="fl">
                      <img src="assets/img/fl.png" alt="" />
                    </span>
                    En
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <span class="fl">
                      <img src="assets/img/fl.png" alt="" />
                    </span>
                    En
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="offcanvas-close">
            <span class="close">
              <img src="assets/img/close.png" alt="" />
            </span>
          </div>
        </div>
        <div class="offcanvas-menu">
          <nav>
            <ul>
              <li>
                <a href="">Sacrifice</a>
              </li>
              <li>
                <a href="">Tokenomics</a>
              </li>
              <li>
                <a href="#air-drop">Airdrop</a>
              </li>
              <li>
                <a href="">Team</a>
              </li>
              <li>
                <a href="">FAQ</a>
              </li>
              <li>
                <a href="">About</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* <!-- offcanvas-menu-end --> */}

      {/* <!-- header --> */}
      <header class="header header-padding">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="header-wrapper d-flex align-items-center justify-content-between">
                <div class="header-logo">
                  <a href="/">
                    <img src="assets/img/logo.svg" alt="" />
                  </a>
                </div>
                <div class="header-menu d-flex align-items-center">
                  <div class="header-menu__nav d-none d-xl-block">
                    <nav>
                      <ul class="d-flex align-items-center">
                        <li>
                          <a href="">Sacrifice</a>
                        </li>
                        <li>
                          <a href="">Tokenomics</a>
                        </li>
                        <li>
                          <a href="/#air-drop">Airdrop</a>
                        </li>
                        <li>
                          <a href="">Team</a>
                        </li>
                        <li>
                          <a href="">FAQ</a>
                        </li>
                        <li>
                          <a href="">About</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div class="header-right d-flex align-items-center ms-xl-3">
                    <div class="header-right__btns d-md-flex align-items-center">
                      <a href="" class="btn me-1 me-md-3">
                        Marketplace
                      </a>

                      <button class="btn btn-borderd" data="Referral"></button>
                    </div>

                    <div class="header-menu__lang d-none d-xl-block">
                      <div class="dropdown">
                        <button
                          class="dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span class="fl">
                            <img src="assets/img/globe.png" alt="" />
                          </span>
                          En
                        </button>
                        <ul
                          class="dropdown-menu"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <li>
                            <a class="dropdown-item" href="#">
                              <span class="fl">
                                <img src="assets/img/fl.png" alt="" />
                              </span>
                              En
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item" href="#">
                              <span class="fl">
                                <img src="assets/img/fl.png" alt="" />
                              </span>
                              En
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div class="header-mobileBar d-xl-none ms-3">
                      <span class="bar">
                        <img src="assets/img/bar.png" alt="" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
});

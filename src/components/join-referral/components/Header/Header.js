import React from "react";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { FiTwitter } from "react-icons/fi";
import { TbBrandTelegram } from "react-icons/tb";
import { useState } from "react";

const Header = () => {
  const [currenLanguage, setCurrentLanguage] = useState("ENG");
  const [showLanguages, setShowLanugages] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const languages = [
    { name: "English", value: "ENG" },
    { name: "French", value: "FRN" },
  ];
  const headerArray = [
    { navItem: "Sacrifice", to: "/sacrifice" },
    { navItem: "Tokenomic", to: "/tokenomic" },
    { navItem: "Airdrop", to: "/airdrop" },
    { navItem: "Team", to: "/team" },
    { navItem: "FAQs", scrollTo: "faq" },
    { navItem: "About", to: "/about" },
  ];
  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);
  return (
    <div className="header-mainWrapper">
      <div className={`${navbar && "header-active"} header-navbars`}>
        {" "}
        <div className="header-wrapper">
          <div className="header-header">
            <div className="header-logoContainer">
              <img
                src="assets/images/logo.png"
                alt="Logo"
                className="header-logo"
              />
              <h3 className="header-logoText">HPX</h3>
            </div>

            <div className="header-navItems">
              <div
                className={`header-navItems header-navbar ${
                  sidebar && "header-sidebar"
                }`}
              >
                {headerArray.map((el, i) =>
                  el.scrollTo ? (
                    <HashLink
                      className="`header-navItem header-navs"
                      key={i}
                      to={el.scrollTo}
                      scroll={(el) =>
                        el.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        })
                      }
                    >
                      {el.navItem}
                    </HashLink>
                  ) : (
                    <Link
                      key={i}
                      to={el.to}
                      className="header-navItem header-navs"
                    >
                      {el.navItem}
                    </Link>
                  )
                )}
                <div className="header-buttonContainer header-mobileButton">
                  <a href="#/" className="header-button">
                    <span className="header-buttonText">Referral</span>
                  </a>
                  <a href="#/" className="header-button header-marketPlace">
                    Marketplace
                  </a>
                </div>
              </div>

              <div className="`header-buttonAndSocial">
                <div className="header-languageContainer">
                  <div className="header-languageAndIcon">
                    <p className="header-language">{currenLanguage}</p>
                    <>
                      {showLanguages ? (
                        <BiChevronUp
                          className="header-icon"
                          onClick={() => setShowLanugages((prev) => !prev)}
                        />
                      ) : (
                        <BiChevronDown
                          className="header-icon"
                          onClick={() => setShowLanugages((prev) => !prev)}
                        />
                      )}{" "}
                    </>
                  </div>
                  {showLanguages && (
                    <div className="header-languagesWrapper">
                      <div className="header-languages">
                        {showLanguages &&
                          languages.map((el, i) => (
                            <p
                              className="`header-selectLanguage header-language"
                              key={i}
                              onClick={() => {
                                setCurrentLanguage(el.value);
                                setShowLanugages(false);
                              }}
                            >
                              {el.name}
                            </p>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="header-socialContainer">
                  <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="header-navItem"
                  >
                    <FiTwitter className="header-social" />
                  </a>
                  <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="header-navItem"
                  >
                    <TbBrandTelegram className="header-social" />
                  </a>
                </div>
                <div className="header-buttonContainer">
                  <a
                    href="#/"
                    className={`header-button ${sidebar && "header-border"}`}
                  >
                    {" "}
                    <span className="header-buttonText">Referral</span>
                  </a>
                  <a
                    href="#/"
                    className={`header-button header-marketPlace ${
                      sidebar && "header-border"
                    }`}
                  >
                    Marketplace
                  </a>
                </div>
              </div>
              {sidebar ? (
                <MdClose
                  color="#fff"
                  className="header-hamberger"
                  onClick={() => setSidebar((prev) => !prev)}
                />
              ) : (
                <GiHamburgerMenu
                  className="header-hamberger"
                  onClick={() => setSidebar((prev) => !prev)}
                />
              )}
            </div>
          </div>{" "}
        </div>{" "}
        <img src="assets/images/top.svg" alt="#" className="header-pattern" />
      </div>
    </div>
  );
};

export default Header;

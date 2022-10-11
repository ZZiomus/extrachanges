import React from "react";

const Connect = ({
  onConnect = () => null,

  isError = false,
  reason = null,
}) => {
  return (
    <div className="connect-mainWrapper">
      <div className="connect-wrapper">
        <div className="connect-connectWrapper">
          <div className="connect-connect">
            <img
              src={"assets/images/connect.png"}
              alt="#"
              className="connect-image"
            />
            <p className="connect-text">Please connect your metamask wallet</p>
            <span onClick={onConnect} className="connect-button">
              Connect
            </span>
            {isError && <p className={"mt-3 alert-danger"}>{reason}</p>}
          </div>

          <p className="connect-bottomText connect-text">
            Please connect your metamask wallet Connect After the first
            connexion and signing the message, your public address of your
            chosen wallet will be stored and you’ll be redirected to{" "}
            <a href="#/" className="connect-sacrifice">
              Sacrifice page
            </a>
          </p>
          <img
            src={"assets/images/connectPattern.svg"}
            alt="#"
            className="connect-pattern"
          />
        </div>
      </div>
    </div>
  );
};

export default Connect;

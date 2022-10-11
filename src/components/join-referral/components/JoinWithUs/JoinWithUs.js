import React from "react";

const JoinWithUs = () => {
  const socialas = [
    { icon: "assets/images/telegram.svg", to: "" },
    { icon: "assets/images/twitter.svg", to: "" },
    { icon: "assets/images/youtube.svg", to: "" },
  ];
  return (
    <div className="joinwith-us-joinWithUs">
      <div className="joinwith-us-Wrapper">
        <h4 className="joinwith-us-title">Join with us</h4>
        <div className="joinwith-us-socialsContainer">
          {socialas.map((el, i) => (
            <a
              href={el.to}
              target="_blank"
              rel="noreferrer"
              key={i}
              className="joinwith-us-iconContainer"
            >
              <img src={el.icon} alt="#" className="joinwith-us-icon" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JoinWithUs;

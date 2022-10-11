import React from "react";
import Copyright from "../copyright/copyright";

const Footer = () => {
  const data = [
    {
      title: "Explore",
      items: [
        { item: "Sacrifice", to: "" },
        { item: "Marketplace", to: "" },

        { item: "HPX Air Drop", to: "" },

        { item: "Elron", to: "" },
      ],
    },
    {
      title: "Community",
      items: [
        { item: "Home", to: "" },
        { item: "Project Status", to: "" },

        { item: "Value", to: "" },

        { item: "Wallet", to: "" },
      ],
    },
    {
      title: "Company",
      items: [
        { item: "About", to: "" },
        { item: "Careers", to: "" },

        { item: "Team", to: "" },

        { item: "Location", to: "" },
      ],
    },
  ];
  return (
    <div className="footer-footer">
      <div className="footer-wrapper">
        <div>
          <h5 className="footer-hpx">HPX</h5>
          <p className="footer-item} footer-text">
            Hpx will work like an Index for all nft’s on Pulsechain. Once a nft
            trade is made thru our platform you will earn yields each time a
            transaction is made, just like a shareholder
          </p>
        </div>
        {data.map((el, i) => (
          <div key={i}>
            <h6 className="footer-title">{el.title}</h6>
            {el.items.map((element, index) => (
              <p className="footer-item" key={index}>
                {element.item}
              </p>
            ))}
          </div>
        ))}
      </div>
      <Copyright />
    </div>
  );
};

export default Footer;

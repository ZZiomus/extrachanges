import React from "react";

const FirstTime = () => {
  return (
    <div className="first-timewrapper">
      <div className="first-timecontainer">
        <h1 className="first-timetitle">
          First time <br className="first-timetitleBr" /> here?
        </h1>

        <div className="first-timetextWrapper">
          <p className="first-timetext">
            Is this the first time you've heard of us? Go and{" "}
            <br className="first-timebr" /> check out our website to better
            understand our <br className="first-timebr" /> project and make sure
            you come back to this link.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirstTime;

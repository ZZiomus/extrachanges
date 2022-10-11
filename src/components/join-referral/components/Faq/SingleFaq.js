import React, { useState } from "react";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
const SingleFaq = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-singleFaq">
      <div className="faq-questionContainer">
        <p className="faq-question">{question}</p>
        {open ? (
          <BiChevronUp
            onClick={() => setOpen((prev) => !prev)}
            className="faq-icon"
          />
        ) : (
          <BiChevronDown
            onClick={() => setOpen((prev) => !prev)}
            className="faq-icon"
          />
        )}
      </div>
      {open && <p className="faq-answer">{answer}</p>}
    </div>
  );
};

export default SingleFaq;

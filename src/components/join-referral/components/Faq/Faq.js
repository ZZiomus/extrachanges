import React from "react";
import SingleFaq from "./SingleFaq";

const Faq = () => {
  const data = [
    {
      question: "Who is responsible for developing HPX?",
      answer:
        "The official list of supported coins is available on Hpx.sx/info after the start of the Sacrifice Phase.",
    },
    {
      question: "So... how do I get my $Hpx ?",
      answer:
        "The official list of supported coins is available on Hpx.sx/info after the start of the Sacrifice Phase.",
    },
    {
      question: "When will $Hpx will be release?",
      answer:
        "The official list of supported coins is available on Hpx.sx/info after the start of the Sacrifice Phase.",
    },
    {
      question: "Where can I see your NFT platform?",
      answer:
        "The official list of supported coins is available on Hpx.sx/info after the start of the Sacrifice Phase.",
    },
    {
      question: "Will I be able to store my $Hpx in Meta Mask?",
      answer:
        "The official list of supported coins is available on Hpx.sx/info after the start of the Sacrifice Phase.",
    },
    {
      question: "I still have questions! Where can I talk about HPX ?",
      answer:
        "The official list of supported coins is available on Hpx.sx/info after the start of the Sacrifice Phase.",
    },
  ];
  return (
    <div className="faq-faqContainer" id="faq">
      <div className="faq-faq">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        {data.map((el, i) => (
          <SingleFaq {...el} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Faq;

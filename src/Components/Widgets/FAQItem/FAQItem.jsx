import React from "react";

const FaqItem = ({ faq }) => {
  const { question, answer, time} = faq;

  const date = new Date(parseInt(time));
  const formattedDate = date.toLocaleDateString();

  return (
    <div className="faq-item">
      <div className="question">
        <strong>Question:</strong> {question}
      </div>
      <div className="answer">
        <strong>Answer:</strong> {answer}
      </div>
      <div className="metadata">
        <span className="time">Asked at: {formattedDate}</span>
      </div>
    </div>
  );
};

export default FaqItem;

import React, { useState } from "react";
import "./FAQForm.scss";
import { firestore } from "../../../Firebase";

const FAQForm = ({ onSubmit, onCancel, videoId }) => {
  const [question, setQuestion] = useState(""); // State for FAQ question
  const [answer, setAnswer] = useState(""); // State for FAQ answer

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Add timestamp to the FAQ data
        const faqWithTimestamp = { question, answer, time: Date.now().toString(), videoId };
        
        // Add FAQ to the Firestore collection
        await firestore.collection(`faq`).add(faqWithTimestamp);
    
        console.log("FAQ added successfully!");
      } catch (error) {
        console.error("Error adding FAQ:", error);
      }




    onSubmit({ question, answer }); // Pass the new FAQ to the parent component
    setQuestion(""); // Reset question input
    setAnswer(""); // Reset answer input
  };

  return (
    <div className="faq-form-container">
      <h3 className="form-heading">Add FAQ</h3>
      <form className="faq-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="question" className="form-label">Question:</label>
          <input
            id="question"
            type="text"
            className="form-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="answer" className="form-label">Answer:</label>
          <textarea
            id="answer"
            className="form-textarea"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" className="submit-button">Submit</button>
          <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default FAQForm;

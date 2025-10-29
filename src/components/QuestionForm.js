import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      prompt,
      answers,
      correctIndex: parseInt(correctIndex, 10),
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((data) => {
        onAddQuestion(data);
        setPrompt("");
        setAnswers(["", "", "", ""]);
        setCorrectIndex(0);
      });
  }

  function handleAnswerChange(index, newValue) {
    const newAnswers = answers.map((ans, i) => (i === index ? newValue : ans));
    setAnswers(newAnswers);
  }

  return (
    <section>
      <h2>New Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="prompt">Prompt:</label>
          <input
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <div>
          <p>Answers:</p>
          {answers.map((answer, index) => (
            <div key={index}>
              <label htmlFor={`answer-${index}`}>Answer {index + 1}:</label>
              <input
                id={`answer-${index}`}
                type="text"
                value={answer}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="correct-answer">Correct Answer:</label>
          <select
            id="correct-answer"
            value={correctIndex}
            onChange={(e) => setCorrectIndex(e.target.value)}
          >
            {answers.map((answer, index) => (
              <option key={index} value={index}>
                {index}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;

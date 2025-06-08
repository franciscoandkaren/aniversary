import React, { useState } from "react";
import "./QuestionCard.css";
import Navigation from "../Navigation/Navigation";

const QuestionCard = ({ question, options, correctAnswer, onCorrect, onPrev, onNext }) => {
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleSelect = (option) => {
    if (selected !== null) return;

    setSelected(option);

    const correct = option === correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      // Esperar 1.2s y llamar a onCorrect si es función
      setTimeout(() => {
        if (typeof onCorrect === "function") {
          onCorrect();
        }
      }, 1200);
    } else {
      // Permitir reintento después de 1.5s si es incorrecto
      setTimeout(() => {
        setSelected(null);
        setIsCorrect(null);
      }, 1500);
    }
  };

  return (
    <div className="question-card">
      <h3>{question}</h3>
      <ul className={`options-list ${selected !== null ? "disabled" : ""}`}>
        {options.map((option, idx) => {
          let className = "option";

          if (selected === option) {
            className += " selected";
            if (isCorrect !== null) {
              className += isCorrect ? " correct" : " incorrect";
            }
          }

          return (
            <li
              key={idx}
              className={className}
              onClick={() => handleSelect(option)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleSelect(option)}
            >
              {option}
            </li>
          );
        })}
      </ul>
      {selected && (
        <p className="feedback" aria-live="polite">
          {isCorrect ? "¡Correcto, puedes continuar! 💖" : "Ups, intenta otra vez 😅"}
        </p>
      )}
      {isCorrect && (
        <Navigation
          onPrev={onPrev}
          onNext={onNext}
        />
      )}
    </div>
  );
};

export default QuestionCard;

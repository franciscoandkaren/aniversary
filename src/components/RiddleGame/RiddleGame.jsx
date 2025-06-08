import React, { useState } from "react";
import "./RiddleGame.css";
import Navigation from "../Navigation/Navigation";
import confetti from "canvas-confetti";

const riddlesData = [
  {
    title: "La Primera Canción 🎶",
    riddle:
      "Es una melodía que guardo con cariño, porque incluso cuando no hablábamos, me recordaba a ti. ¿Cuál es?",
    answer: "Scared To Be Lonely",
    hints: [
      "Es una colaboración entre Martin Garrix y Dua Lipa.",
      "Habla sobre la soledad en medio del amor.",
      "Su ritmo es suave pero emocional.",
    ],
  },
  {
    title: "El Primer Regalo 🎁",
    riddle:
      "Un detalle que me hizo sonreír, un gesto que no esperaba. ¿Recuerdas en qué ocasión especial me lo diste?",
    answer: "cumpleaños",
    hints: [
      "Se celebra una vez al año, pero ese día fue diferente.",
      "Llegó envuelto en sorpresa, más que en papel.",
      "Ese gesto rompió el hielo y encendió algo entre nosotros.",
    ],
  },
  {
    title: "El Segundo Regalo 🎁",
    riddle:
      "Bueno, ahora vamos con la otra parte de la historia. ¿Recuerdas cuál fue el segundo regalo que te di?",
    answer: "Retrato de Baby",
    hints: [
      "Fue algo hecho especialmente para ti.",
      "Tiene orejas largas y mirada adorable.",
      "Es gris con mucho corazón.",
      "No ladra, pero te acompaña con su ternura.",
      "Está enmarcado y no se mueve, pero transmite amor.",
      "Tiene cuatro patas… aunque dibujadas.",
      "Imaginé que estaría complicado de responder, pero sé que lo recuerdas. La respuesta es un: retrato de Baby",
    ],
  },
];

export default function RiddleGame({ onPrev, onNext, onSuccess }) {
  const [level, setLevel] = useState(0);
  const [guess, setGuess] = useState("");
  const [hintIndex, setHintIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [animate, setAnimate] = useState(false);

  const currentRiddle = riddlesData[level];
  const isLastLevel = level === riddlesData.length - 1;

  function requestHint() {
    if (hintIndex < currentRiddle.hints.length) {
      setMessage(`💡 ${currentRiddle.hints[hintIndex]}`);
      setHintIndex(hintIndex + 1);
    } else {
      setMessage("⚠️ No quedan más pistas disponibles.");
    }
  }

  function handleSubmit() {
    if (showAnswer) return; // evita enviar varias veces
    if (guess.trim().toLowerCase() === currentRiddle.answer.toLowerCase()) {
      setMessage("✅ ¡Correcto! 🎉");
      setShowAnswer(true);
      setAnimate(true);

      if (isLastLevel) {
        setTimeout(() => confetti({ spread: 90, particleCount: 200 }), 300);
      }

      setTimeout(() => {
        if (!isLastLevel) {
          setLevel(level + 1);
          setGuess("");
          setHintIndex(0);
          setMessage("");
          setShowAnswer(false);
          setAnimate(false);
        } else {
          setCompleted(true);
          setMessage("🎉 ¡Felicidades! Has completado todas las adivinanzas.");
          if (typeof onSuccess === "function") {
            onSuccess();
          }
        }
      }, 2000);
    } else {
      setMessage("❌ Respuesta incorrecta. Intenta otra vez o pide una pista.");
    }
  }

  // Para detectar "Enter" en el input y enviar sin submit
  function handleKeyDown(e) {
    if (e.key === "Enter" && !showAnswer) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className={`riddle-game-container ${animate ? "correct" : ""}`}>
      {!completed && (
        <>
          <h2 className="riddle-title">{currentRiddle.title}</h2>
          <p className="riddle-text fade-in">{currentRiddle.riddle}</p>
          <div className="riddle-form">
            <input
              type="text"
              placeholder="Escribe tu respuesta aquí"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              disabled={showAnswer}
              autoFocus
              required
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSubmit} disabled={showAnswer}>
              Enviar
            </button>
          </div>

          <button
            onClick={requestHint}
            disabled={showAnswer}
            className="hint-button"
          >
            Pedir pista
          </button>
        </>
      )}

      {message && <p className="riddle-message">{message}</p>}

      {completed && <Navigation onPrev={onPrev} onNext={onNext} />}
    </div>
  );
}

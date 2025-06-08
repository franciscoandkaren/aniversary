import React, { useState, useEffect } from "react";
import "./MatchingGame3D.css";
import Navigation from "../Navigation/Navigation";
import { motion, AnimatePresence } from "framer-motion";

const pairsData = [
  { id: 1, content: "Nuestro día especial 🍝" },
  { id: 2, content: "El lugar donde fuimos 🌳" },
  { id: 3, content: "Primer beso 💋" },
  { id: 4, content: "Nuestras canciones 🎶" },
  { id: 5, content: "Envejecer de la mano 👵👴" },
  { id: 6, content: "Casarnos en un lugar especial 💍" },
];

const memoryNarratives = {
  1: "Recuerdo el día en que nos hicimos novios. Estaba nervioso, pero era de esos nervios bonitos... porque sabía que lo que sentía era real. ❤️",
  2: "Fuimos a muchos lugares, pero esa placita cerca de la U quedó en mi memoria. Ahí escuchamos algo que aún resuena en mi corazón.",
  3: "Ese primer beso... recuerdo que te lo pedì todo tímido, pero fue dulce y lleno de promesas que desde entonces hemos ido cumpliendo.",
  4: "Tus ideas siempre me sorprenden, como cuand sugeriste nuestra playlist. Cada vez que suena, vuelvo a enamorarme de ti.",
  5: "👵👴 Imagino envejecer contigo, compartiendo arrugas, historias, y ese amor que solo crece con los años.",
  6: "💍 Algún día, en un lugar mágico, diremos 'sí' rodeados de todo lo que soñamos.",
};

function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const MatchingGame3D = ({ onPrev, onNext }) => {
  const [cards, setCards] = useState(() =>
    shuffleArray(
      pairsData
        .concat(pairsData)
        .map((item, index) => ({ ...item, key: index, matched: false }))
    )
  );

  const [flipped, setFlipped] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [matchesCount, setMatchesCount] = useState(0);
  const [matchedMemory, setMatchedMemory] = useState(null);

  useEffect(() => {
    if (matchedMemory !== null) {
      const el = document.querySelector(".memory-narrative");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });

      const timeout = setTimeout(() => setMatchedMemory(null), 8000);
      return () => clearTimeout(timeout);
    }
  }, [matchedMemory]);
  const handleCardClick = (index) => {
    if (disabled) return;
    if (flipped.includes(index) || cards[index].matched) return;

    if (flipped.length === 0) {
      setFlipped([index]);
    } else if (flipped.length === 1) {
      setFlipped([flipped[0], index]);
      setDisabled(true);

      if (cards[flipped[0]].id === cards[index].id) {
        setTimeout(() => {
          setCards((prev) => {
            const newCards = [...prev];
            newCards[flipped[0]].matched = true;
            newCards[index].matched = true;
            return newCards;
          });
          setMatchedMemory(cards[index].id);
          setFlipped([]);
          setMatchesCount((prev) => prev + 1);
          setDisabled(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1200);
      }
    }
  };

  return (
    <div className="matching-game-wrapper">
      <p className="level-intro">
        A veces, los mejores recuerdos viven en pequeños detalles. Encuentra las
        parejas y revive momentos únicos que marcaron nuestra historia ❤️
      </p>

      <div className="grid">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || card.matched;
          return (
            <div
              key={card.key}
              className={`card ${isFlipped ? "flipped" : ""}`}
              onClick={() => handleCardClick(index)}
              aria-label={isFlipped ? card.content : "Carta boca abajo"}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCardClick(index);
              }}
            >
              <div className="card-face front"></div>
              <div className="card-face back">{card.content}</div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {matchedMemory && (
          <motion.div
            className="memory-narrative"
            key={matchedMemory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.6 }}
          >
            {memoryNarratives[matchedMemory]}
          </motion.div>
        )}
      </AnimatePresence>

      {matchesCount === pairsData.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
        >
          <div className="status-message">
            ¡Felicidades! Completaste el juego.
          </div>
          <Navigation onPrev={onPrev} onNext={onNext} />
        </motion.div>
      )}
    </div>
  );
};

export default MatchingGame3D;

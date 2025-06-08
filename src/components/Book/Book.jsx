import React, { useState, useRef, useEffect } from "react";
import "./Book.css";
import Cover from "../Cover/Cover";
import Page from "../Page/Page";
import { motion, AnimatePresence } from "framer-motion";
import QuestionCard from "../QuestionCard/QuestionCard";
import ButtonLetter from "../ButtonLetter/ButtonLetter";
import LoveLetter from "../LoveLetter/LoveLetter";
import TimelineChallenge from "../TimeLineChallenge/TimeLineChallenge";
import MatchingGame3D from "../MatchingGame3D/MatchingGame3D";
import RiddleGame from "../RiddleGame/RiddleGame";
import WelcomePage from "../WelcomePage/WelcomePage";

const Book = () => {
  const [currentPage, setCurrentPage] = useState(-1);
  const [flipping, setFlipping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLetterVisible, setIsLetterVisible] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("correctAnswers");
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const bookRef = useRef(null);

  const levelsWithPages = [
    {
      title: "Bienvenida a Nuestra Historia",
      content:
        "Esta pequeña app te invita a recorrer los momentos especiales de nuestra historia juntos.",
      question: "",
      answer: "",
      hint: "",
      options: [],
    },
    {
      title: "El primer encuentro (¡qué momento! 😄)",
      content:
        "Todo comenzó en un lugar que guarda nuestros secretos... ¿recuerdas cuál fue? La primera está chicle.",
      question: "¿Dónde empezó nuestra aventura juntos?",
      answer: "universidad",
      hint: "Un lugar al aire libre con árboles, risas y alguna que otra caminata espontánea.",
      options: ["parque", "colegio", "universidad", "trufi"],
    },
    {
      title: "Los primeros sentimientos 💓",
      content:
        "Los primeros sentimientos siempre tienen ese toque mágico... ¿recuerdas nuestra primera película juntos?",
      question: "¿Cuál fue la primera película que vimos juntos?",
      answer: "Deadpool 3",
      hint: "Un superhéroe que rompe la cuarta pared y nos hizo reír a carcajadas.",
      options: [
        "Titanic",
        "Deadpool 3",
        "X-Men: Días del Futuro Pasado",
        "Busqueda Implacable",
        "Una vida en un año",
      ],
    },
    {
      title: "Momentos Especiales",
      content: "Cada instant contigo es un regalo...",
      question: "¿Cuál fue el destino de nuestro primer viaje juntos?",
      answer: "playa",
      hint: "Un lugar con arena y mar",
      options: ["montaña", "playa", "bosque", "ciudad"],
    },
    {
      title: "La cronología de nuestra historia",
      content: "Sé que nos esperan muchas aventuras más...",
      question: "",
      answer: "",
      hint: "",
      options: [],
    },
    {
      title: "El Desafío",
      content: "Cada día contigo es una nueva aventura...",
      question: "¿Cuál es la película que vimos en nuestra primera cita?",
      answer: "Inception",
      hint: "Una película sobre sueños dentro de sueños",
      options: ["Titanic", "Inception", "La La Land", "Avatar"],
    },
    {
      title: "La Sorpresa Final",
      content: "Has llegado hasta aquí...",
      question: "¿Cuál es mi color favorito?",
      answer: "azul",
      hint: "Es el color del cielo despejado",
      options: ["rojo", "verde", "azul", "morado"],
    },
    {
      title: "El primer 'Te Amo'",
      content: "La primera vez que nos dijimos esas palabras mágicas...",
      question: null,
      answer: null,
      hint: null,
      options: null,
    },
    {
      title: "Nuestras canciones",
      content: "Las melodías que nos acompañan...",
      question: null,
      answer: null,
      hint: null,
      options: null,
    },
    {
      title: "El primer regalo",
      content: "El detalle con el que comenzamos a expresar nuestro cariño...",
      question: null,
      answer: null,
      hint: null,
      options: null,
    },
  ];

  const playSound = () => {
    if (typeof window !== "undefined") {
      const audio = new Audio("/sounds/page-turn.mp3");
      audio.volume = 0.3;
      audio.play().catch((e) => console.log("Audio playback error:", e));
    }
  };

  const handleFlip = (direction) => {
    if (isAnimating) return;

    setIsAnimating(true);
    playSound();
    setFlipping(true);

    setTimeout(() => {
      setCurrentPage((prev) => {
        if (direction === "next") {
          return prev < levelsWithPages.length - 1 ? prev + 1 : prev;
        } else if (direction === "letter") {
          setIsLetterVisible(true);
          return prev;
        } else {
          return prev > -1 ? prev - 1 : prev;
        }
      });
      setFlipping(false);

      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 800);
  };

  const handleCorrectAnswer = (pageIndex) => {
    setCorrectAnswers((prev) => {
      const updated = { ...prev, [pageIndex]: true };
      if (typeof window !== "undefined") {
        localStorage.setItem("correctAnswers", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const renderContentForPage = (pageIndex) => {
    switch (pageIndex) {
      case 0:
        return (
          <WelcomePage
            onPrev={() => handleFlip("prev")}
            onNext={() => handleFlip("next")}
          />
        );
      case 3:
        return (
          <RiddleGame
            onPrev={() => handleFlip("prev")}
            onNext={() => handleFlip("next")}
          />
        );
      case 4:
        return (
          <TimelineChallenge
            onPrev={() => handleFlip("prev")}
            onNext={() => handleFlip("next")}
            onSuccess={() =>
              setCorrectAnswers((prev) => ({ ...prev, [pageIndex]: true }))
            }
          />
        );
      case 5:
        return (
          <MatchingGame3D
            onPrev={() => handleFlip("prev")}
            onNext={() => handleFlip("letter")}
          />
        );
      default:
        const level = levelsWithPages[pageIndex];
        if (!level) return null;
        return (
          <motion.div
            key={`question-${pageIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
          >
            <QuestionCard
              question={level.question}
              options={level.options}
              correctAnswer={level.answer}
              hint={level.hint}
              onCorrect={() => handleCorrectAnswer(pageIndex)}
              onPrev={() => handleFlip("prev")}
              onNext={() => handleFlip("next")}
            />
          </motion.div>
        );
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      new Audio("/sounds/page-turn.mp3").load();
    }
  }, []);

  return (
    <div className="book-container" ref={bookRef}>
      {currentPage === -1 ? (
        <Cover flipping={flipping} onClick={() => handleFlip("next")} />
      ) : (
        <AnimatePresence mode="wait">
          {!isLetterVisible && (
            <Page
              content={levelsWithPages[currentPage]}
              flipping={flipping}
              pageNumber={currentPage + 1}
              totalPages={levelsWithPages.length}
              isActive={!isAnimating}
            >
              {renderContentForPage(currentPage)}
            </Page>
          )}
          {isLetterVisible && <LoveLetter />}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Book;

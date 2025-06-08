import { useEffect } from "react";
import { motion } from "framer-motion";

const Navigation = ({ onPrev, onNext }) => {
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleGesture();
    };

    const handleGesture = () => {
      const threshold = 50; // mínimo de distancia para activar
      const diff = touchEndX - touchStartX;
      if (diff > threshold) {
        onPrev(); // Swipe a la derecha
      } else if (diff < -threshold) {
        onNext(); // Swipe a la izquierda
      }
    };

    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchend", handleTouchEnd, false);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
    >
      <div className="navigation desktop-only">
        <button className="prev-button" onClick={onPrev}>
          ← Anterior
        </button>
        <button onClick={onNext}>Siguiente →</button>
      </div>
    </motion.div>
  );
};

export default Navigation;

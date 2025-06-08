import React from "react";
import "./Cover.css";

const Cover = ({ flipping, onClick }) => {
  return (
    <div
      className={`cover book-cover ${flipping ? "flipping" : ""}`}
      onClick={onClick}
      aria-label="Portada del libro - Haz clic para abrir"
    >
      <div className="cover-front">
        <div className="book-cover-3d">
          <div className="cover-content">
            <h1  className="animated-title">UNA HISTORIA CON PATAS</h1>
            <p className="animated-subtitle">Un camino de huellas y momentos inolvidables</p>
            <div className="couple-names animated-names">
              <span>Fran</span>
              <span className="ampersand">&</span>
              <span>Ana</span>
            </div>
          </div>
          <div className="gold-emboss"></div>

          {/* ✨ Animaciones decorativas que no afectan la lógica */}
          <div className="floating-ornaments">
            <div className="sparkle sparkle-1"></div>
            <div className="sparkle sparkle-2"></div>
            <div className="sparkle sparkle-3"></div>
          </div>
        </div>
      </div>

      <div className="cover-back"></div>
      <div className="book-spine"></div>
      <div className="page-edge"></div>
    </div>
  );
};

export default Cover;

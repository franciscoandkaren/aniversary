import React, { useState } from "react";
import "./App.css";
import Book from "../Book/Book";
// import CoverWrapper from '../CoverWrapper/CoverWrapper';
import Cover from "../Cover/Cover";

function App() {
  const [showCover, setShowCover] = useState(true);

  const startBook = () => {
    setShowCover(false);
  };

  const restartBook = () => {
    setShowCover(true);
  };

  return (
    <div className="app-container">
      <Book onRestart={restartBook} />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "./WelcomePage.css";
import Navigation from "../Navigation/Navigation";

const WelcomePage = ({onPrev, onNext}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className={`welcome-page ${visible ? "visible" : ""}`}>
      {/* <h1 className="title">Una historia con patas</h1>
      <h3 className="subtitle">Un camino de huellas y momentos inolvidables</h3> */}
      <p className="text">
        Responderás preguntas y resolverás pequeños acertijos en cada página. Espero que disfrutes este viaje tanto como yo, y que nunca olvides lo importante y especial que eres para mí.
      </p>
      <Navigation onPrev={onPrev} onNext={onNext} />
    </div>
  );
};

export default WelcomePage;

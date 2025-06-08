import React from 'react';
import '../Navigation/Navigation.css';

const ButtonLetter = ({onNext, disabled}) => {
  return (
    <div className="navigation">
      <button 
        onClick={onNext} 
        aria-label="Finalizar"
        disabled={disabled}
      >
        Finalizar →
      </button>
    </div>
  );
};

export default ButtonLetter;
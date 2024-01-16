import React, { useState } from 'react';
import '../styles/ButtonStyles.css';

const DualHoverButtons = () => {
  const [isButton1Hovered, setIsButton1Hovered] = useState(false);
  const [isButton2Hovered, setIsButton2Hovered] = useState(false);

  const [isButton1cliked, setIsButton1Cliked] = useState(false);
  const [isButton2cliked, setIsButton2Cliked] = useState(false);

  const handleButton1Hover = () => {
    setIsButton1Hovered(true);
    setIsButton2Hovered(false);
  };

  const handleButton2Hover = () => {
    setIsButton1Hovered(false);
    setIsButton2Hovered(true);
  };

  const handleButtonClick = (buttonNumber) => {
    if (buttonNumber === 1) {
      setIsButton1Hovered(true);
      setIsButton2Hovered(false);
      setIsButton1Cliked(true);
      setIsButton2Cliked(false);

    } else if (buttonNumber === 2) {
        setIsButton1Hovered(false);
      setIsButton2Hovered(true);
        setIsButton1Cliked(false);
        setIsButton2Cliked(true);
    }
  };

  return (
    <div>
      <button
        className={isButton1Hovered && isButton1cliked ? 'hovered cliked' : isButton1Hovered ? 'hovered' : isButton1cliked ? 'cliked' : ''}

        onMouseEnter={handleButton1Hover}
        onMouseLeave={() => setIsButton1Hovered(false)}
        onClick={() => handleButtonClick(1)}
      >
        Bouton 1
      </button>

      <button
        className={isButton2Hovered && isButton2cliked ? 'hovered cliked' : isButton2Hovered ? 'hovered' : isButton2cliked ? 'cliked' : ''}

        onMouseEnter={handleButton2Hover}
        onMouseLeave={() => setIsButton2Hovered(false)}
        onClick={() => handleButtonClick(2)}
      >
        Bouton 2
      </button>
    </div>
  );
};

export default DualHoverButtons;

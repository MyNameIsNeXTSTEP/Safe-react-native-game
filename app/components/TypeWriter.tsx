import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, delay }: { text: string, delay: number }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout: number;

    if (currentIndex <= text.length - 1) {
      timeout = setTimeout(() => {
        setCurrentText(currentText + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, delay);

    }
    return () => clearTimeout(timeout);
  }, [currentIndex, delay, text]);

  return <span style={{ marginTop: 32 }}>{currentText}</span>;
};

export default Typewriter;
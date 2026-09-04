import React, { useState, useEffect } from 'react';

interface DynamicTextProps {
  phrases: string[];
  intervalMs?: number;
}

export const DynamicText: React.FC<DynamicTextProps> = ({ phrases, intervalMs = 2800 }) => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        setFade(true); // fade in new phrase
      }, 300);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [phrases, intervalMs]);

  return (
    <span
      className={`inline-block transition-all duration-300 transform ${
        fade ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95'
      } text-transparent bg-clip-text bg-gradient-to-r from-[#8FFF00] via-[#9EFF00] to-emerald-400`}
    >
      {phrases[index]}
    </span>
  );
};

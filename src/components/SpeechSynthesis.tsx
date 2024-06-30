// src/components/SpeechSynthesis.tsx
import React from 'react';

const SpeechSynthesis: React.FC = () => {
  const speak = () => {
    const utterance = new SpeechSynthesisUtterance('Hello, I am speaking using the SpeechSynthesisUtterance API.');
    utterance.rate = 1; // Speed of the speech
    utterance.pitch = 1; // Pitch of the speech
    utterance.volume = 1; // Volume of the speech
    utterance.lang = 'en-US'; // Language of the speech
    
    utterance.onstart = () => {
      console.log('Speech has started');
    };
    
    utterance.onend = () => {
      console.log('Speech has ended');
    };
    
    utterance.onerror = (event) => {
      console.error('SpeechSynthesisUtterance error', event);
    };
    
    speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <button onClick={speak}>Speak</button>
    </div>
  );
};

export default SpeechSynthesis;

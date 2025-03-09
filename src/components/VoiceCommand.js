import React, { useState } from 'react';

const VoiceCommand = ({ onSearch }) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      if (event.results && event.results[0] && event.results[0][0]) {
        const transcript = event.results[0][0].transcript;
        onSearch(transcript);
      }
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      if (event.error !== 'no-speech') {
        console.error('Speech recognition error:', event.error);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
      setIsListening(true);
    } catch (error) {
      console.error('Speech recognition error:', error);
      setIsListening(false);
    }
  };

  return (
    <button
      className={`voice-trigger ${isListening ? 'active' : ''}`}
      onClick={startListening}
      disabled={isListening}
      aria-label="Voice search"
      title="Click to start voice search"
    >
      {isListening ? 'Listening...' : 'Voice Search'}
    </button>
  );
};

export default VoiceCommand;

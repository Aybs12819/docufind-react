// src/components/VoiceCommand.js
import React from 'react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useNavigate } from 'react-router-dom';

const VoiceCommand = () => {
  const navigate = useNavigate();

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({
    commands: [
      {
        command: 'search *',
        callback: (searchTerm) => {
          console.log(`Searching for: ${searchTerm}`);
          // Implement search logic here
        },
      },
      {
        command: 'go to dashboard',
        callback: () => {
          navigate('/dashboard');
          console.log('Navigating to dashboard');
        },
      },
      {
        command: 'go to documents',
        callback: () => {
          navigate('/documents');
          console.log('Navigating to documents');
        },
      },
      {
        command: 'go to admin',
        callback: () => {
          navigate('/admin');
          console.log('Navigating to admin dashboard');
        },
      },
      {
        command: 'go to login',
        callback: () => {
          navigate('/login');
          console.log('Navigating to login page');
        },
      },
      {
        command: 'go to register',
        callback: () => {
          navigate('/register');
          console.log('Navigating to register page');
        },
      },
    ],
  });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Transcript: {transcript}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <h3>Sample Voice Commands:</h3>
      <ul>
        <li>"Search [term]" - Search for documents</li>
        <li>"Go to dashboard" - Navigate to the main dashboard</li>
        <li>"Go to documents" - Navigate to the document management page</li>
        <li>"Go to admin" - Navigate to the admin dashboard</li>
        <li>"Go to login" - Navigate to the login page</li>
        <li>"Go to register" - Navigate to the registration page</li>
      </ul>
    </div>
  );
};

export default VoiceCommand;

import React, { useState } from 'react';
import './Recorder.css';

const Voice = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');

  let recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = () => {
    console.log('Recording started');
    setIsRecording(true);
  };

  recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' ';
      } else {
        interimTranscript += transcript;
      }
    }

    setTranscription(finalTranscript);
  };

  const handleStartRecording = () => {
    recognition.start();
  };

  const handleStopRecording = () => {
    recognition.stop();
    setIsRecording(false);
  };

  return (
    <div className={`recorder ${isRecording ? 'recording' : ''}`}>
      <h1>Voice Recorder</h1>
      <button onClick={handleStartRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={handleStopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      <div className={`transcription ${transcription ? 'visible' : ''}`}>
        <h2>Transcription:</h2>
        <p>{transcription}</p>
      </div>
    </div>
  );
};

export default Voice;
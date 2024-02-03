import React from "react";
import ReactDOM from "react-dom/client";
import { AudioRecorder } from "react-audio-voice-recorder";

const addAudioElement = (blob: Blob | MediaSource) => {
  const url = URL.createObjectURL(blob);
  console.log(blob);
  const audio = document.createElement("audio");
  audio.src = url;
  audio.controls = true;
  document.body.appendChild(audio);
};

const VoiceRecorder = () => {
  return (
    <AudioRecorder
      onRecordingComplete={addAudioElement}
      audioTrackConstraints={{
        noiseSuppression: true,
        echoCancellation: true,
      }}
      downloadFileExtension="webm"
    />
  );
};

export default VoiceRecorder;

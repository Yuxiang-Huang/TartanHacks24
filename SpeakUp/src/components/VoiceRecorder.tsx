import React from "react";
import ReactDOM from "react-dom/client";
import { Buffer } from "buffer";
import { AudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";

const addAudioElement = (blob: Blob | MediaSource) => {
  blob = blob as Blob;
  blob.arrayBuffer().then((arrayBuffer) => {
    const uint8Array = new Uint8Array(arrayBuffer);
    const buffer = Buffer.from(uint8Array).toString("base64");
    // axios
    //   .post("http://localhost:8000/create", { audio: buffer })
    //   .then(() => console.log("Created"))
    //   .catch((err) => {
    //     console.error(err);
    //   });
  });
  analyzeAudio(blob);
  createAudioDisplay(blob);
};

const analyzeAudio = async (blob: Blob) => {
  const formData = new FormData();
  formData.append("audio", blob);

  try {
    axios.post("http://127.0.0.1:5000/", formData).then((result) => {
      console.log(result.data);
    });
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

const generate = () => {
  axios
    .get("http://localhost:8000/")
    .then((result) => {
      result.data.forEach((element: { audio: { data: Iterable<number> } }) => {
        const uint8Array = new Uint8Array(element.audio.data);
        const blob: Blob = new Blob([uint8Array]);
        createAudioDisplay(blob);
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

const createAudioDisplay = (blob: Blob | MediaSource) => {
  const url = URL.createObjectURL(blob);

  const audio = document.createElement("audio");
  audio.src = url;
  audio.controls = true;
  document.body.appendChild(audio);
};

const VoiceRecorder = () => {
  return (
    <div>
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        // downloadOnSavePress={true}
        downloadFileExtension="mp3"
      />

      <button className="border-2" onClick={generate}>
        Button
      </button>
    </div>
  );
};

export default VoiceRecorder;

import React from "react";
import ReactDOM from "react-dom/client";
import { Buffer } from "buffer";
import { AudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";

export const addAudioElement = (blob: Blob | MediaSource) => {
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

export const generate = () => {
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

interface VoiceRecorderProps {
  handleClick: () => void;
  isRecording: boolean;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ handleClick, isRecording }) => {
  

  return (
    <div>
      {/* <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        // downloadOnSavePress={true}
        downloadFileExtension="mp3"
      /> */}

      {/* <button className="border-2" onClick={generate}>
        Button
      </button> */}

      <div className="h-64 w-full relative mt-3 mb-10">
        <svg height="90%" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition ease-in-out " viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(45)">
              {/* <stop offset="5%" stopColor="pink" />
              <stop offset="95%" stopColor="red" /> */}
              <stop offset='0' stopColor='red'>
              </stop>
              <stop offset='1' stopColor='#CC02DD'>
              </stop>
              <animateTransform attributeName="gradientTransform" type="rotate" values="360 .5 .5;0 .5 .5"
                dur="4s" repeatCount="indefinite" />
            </linearGradient>
          </defs>
          <circle onClick={handleClick} className="cursor-pointer animate-spin origin-center" r="50" cx="50%" cy="50%" fill="url(#gradient)" />
          {/* <polygon fill="url(#gradient)" style={{ strokeLinejoin: 'round' }}>
            <animate fill="red" attributeName="points" dur="500ms" repeatCount="indefinite" values="10,10 10,90 90,90, 90,10;50,10 90,50 50,90 10,50;10,10 10,90 90,90, 90,10" />
          </polygon> */}
          {!isRecording ? <path onClick={handleClick} className="cursor-pointer" d="M 10 50 
            C 10 52, 11 52, 12 50
            C 13 48, 14 48, 15 50
            C 16 52, 17 52, 18 50
            C 19 48, 20 48, 21 50
            C 22 52, 23 52, 24 50
            C 25 48, 26 48, 27 50
            C 28 52, 29 52, 30 50
            C 31 48, 32 48, 33 50
            C 34 52, 35 52, 36 50
            C 37 48, 38 48, 39 50
            C 40 52, 41 52, 42 50
            C 43 48, 44 48, 45 50
            C 46 52, 47 52, 48 50
            C 49 48, 50 48, 51 50
            C 52 52, 53 52, 54 50
            C 55 48, 56 48, 57 50
            C 58 52, 59 52, 60 50
            C 61 48, 62 48, 63 50
            C 64 52, 65 52, 66 50
            C 67 48, 68 48, 69 50
            C 70 52, 71 52, 72 50
            C 73 48, 74 48, 75 50
            C 76 52, 77 52, 78 50
            C 79 48, 80 48, 81 50
            C 82 52, 83 52, 84 50
            C 85 48, 86 48, 87 50
            C 88 52, 89 52, 90 50"
            stroke="white" fill="transparent" />
            : <path onClick={handleClick} className="cursor-pointer"
              stroke="white" fill="transparent">
              <animate attributeName="d" dur="350ms" repeatCount="indefinite" values="M 10 50 
          C 10 52, 11 52, 12 50
          C 13 48, 14 48, 15 50
          C 16 52, 17 52, 18 50
          C 19 48, 20 48, 21 50
          C 22 52, 23 52, 24 50
          C 25 48, 26 48, 27 50
          C 28 52, 29 52, 30 50
          C 31 48, 32 48, 33 50
          C 34 52, 35 52, 36 50
          C 37 48, 38 48, 39 50
          C 40 52, 41 52, 42 50
          C 43 48, 44 48, 45 50
          C 46 52, 47 52, 48 50
          C 49 48, 50 48, 51 50
          C 52 52, 53 52, 54 50
          C 55 48, 56 48, 57 50
          C 58 52, 59 52, 60 50
          C 61 48, 62 48, 63 50
          C 64 52, 65 52, 66 50
          C 67 48, 68 48, 69 50
          C 70 52, 71 52, 72 50
          C 73 48, 74 48, 75 50
          C 76 52, 77 52, 78 50
          C 79 48, 80 48, 81 50
          C 82 52, 83 52, 84 50
          C 85 48, 86 48, 87 50
          C 88 52, 89 52, 90 50;
          M 10 50 
          C 10 44, 11 44, 12 50
          C 13 59, 14 59, 15 50
          C 16 39, 17 39, 18 50
          C 19 64, 20 64, 21 50
          C 22 34, 23 34, 24 50
          C 25 69, 26 69, 27 50
          C 28 29, 29 29, 30 50
          C 31 74, 32 74, 33 50
          C 34 24, 35 24, 36 50
          C 37 79, 38 79, 39 50
          C 40 19, 41 19, 42 50
          C 43 84, 44 84, 45 50
          C 46 14, 47 14, 48 50
          C 49 89, 50 89, 51 50
          C 52 12, 53 12, 54 50
          C 55 85, 56 85, 57 50
          C 58 17, 59 17, 60 50
          C 61 80, 62 80, 63 50
          C 64 22, 65 22, 66 50
          C 67 75, 68 75, 69 50
          C 70 27, 71 27, 72 50
          C 73 70, 74 70, 75 50
          C 76 32, 77 32, 78 50
          C 79 65, 80 65, 81 50
          C 82 37, 83 37, 84 50
          C 85 60, 86 60, 87 50
          C 88 42, 89 42, 90 50;
          M 10 50 
          C 10 52, 11 52, 12 50
          C 13 48, 14 48, 15 50
          C 16 52, 17 52, 18 50
          C 19 48, 20 48, 21 50
          C 22 52, 23 52, 24 50
          C 25 48, 26 48, 27 50
          C 28 52, 29 52, 30 50
          C 31 48, 32 48, 33 50
          C 34 52, 35 52, 36 50
          C 37 48, 38 48, 39 50
          C 40 52, 41 52, 42 50
          C 43 48, 44 48, 45 50
          C 46 52, 47 52, 48 50
          C 49 48, 50 48, 51 50
          C 52 52, 53 52, 54 50
          C 55 48, 56 48, 57 50
          C 58 52, 59 52, 60 50
          C 61 48, 62 48, 63 50
          C 64 52, 65 52, 66 50
          C 67 48, 68 48, 69 50
          C 70 52, 71 52, 72 50
          C 73 48, 74 48, 75 50
          C 76 52, 77 52, 78 50
          C 79 48, 80 48, 81 50
          C 82 52, 83 52, 84 50
          C 85 48, 86 48, 87 50
          C 88 52, 89 52, 90 50
          "></animate>
            </path>}

          {/* <path d="M 20 45 C 25 70, 31 70, 36 50 C 44 10, 56 10, 64 50 C 69 70, 75 70, 80 50" stroke="white"  fill="transparent"/> */}
          {/* <path d="M 10 50 L 20 50 L 25 40 L 28 55 L 30 45 L 35 65 L 45 30 L 53 80 L 64 20 L 75 60 L 80 50 L 90 50" stroke="white" fill="transparent"/> */}
        </svg>
      </div>
    </div>
  );
};

export default VoiceRecorder;

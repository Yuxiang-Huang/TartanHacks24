import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import "./css/global.css";
import "./components/VoiceRecorder";
import VoiceRecorder, { addAudioElement } from "./components/VoiceRecorder";
import TextBox from "./components/TextBox";
import PastRecordingsModal from "./components/PastRecordingsModal";
import LoginButton from "./components/LoginButton";
import LoginModal from "./components/LoginModal";
import FeedbackBox from "./components/FeedbackBox";
import { useAudioRecorder } from "react-audio-voice-recorder";

export interface TextSegment {
  text: string;
  rating: number;
}

export interface Feedback {
  transcript: string;
  score: number;
  pace: number;
  fillerWords: string[];
  numFillerWords: number;
  feedback: string;
}

function App() {
  const [isFeedbackReady, setIsFeedbackReady] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>({
    transcript: "",
    score: 0,
    pace: 0,
    fillerWords: [],
    numFillerWords: 0,
    feedback: "",
  });
  const [isPastRecordingsModalOpen, setIsPastRecordingsModalOpen] =
    useState(false);
  const [audioURL, setAudioURL] = useState("");
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder();
  // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRecord = () => {
    if (!isRecording) {
      // thing to start recording
      startRecording();
    } else {
      stopRecording();
      // thing to analyze recording
    }
  };

  const analyzeAudio = async (blob: Blob) => {
    try {
      const formData = new FormData();
      formData.append("audio", blob);
      axios.post("http://127.0.0.1:5000/", formData).then((result) => {
        setFeedback(JSON.parse(result.data).response);
        setIsFeedbackReady(true);
      });
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (!recordingBlob) return;
    addAudioElement(recordingBlob as Blob);
    analyzeAudio(recordingBlob);
    setAudioURL(URL.createObjectURL(recordingBlob));
  }, [recordingBlob]);

  return (
    <div className="text-center">
      <PastRecordingsModal
        isOpen={isPastRecordingsModalOpen}
        onClose={() => setIsPastRecordingsModalOpen(false)}
      />

      {/* <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}/> */}

      <h1 className="mt-6 mb-4 hover:scale-110 transition ease-in-out ">
        Speak<span className="font-normal font-thin">UP</span>
      </h1>

      {/* <LoginButton isLoggedIn={isLoggedIn} logout={() => setIsLoggedIn(false)} openModal={() => setIsLoginModalOpen(true)}/> */}

      <button
        className="mb-12 transition ease-in-out border-black border px-3 py-1 hover:rounded-xl hover:scale-110 hover:font-special"
        onClick={() => {
          setIsPastRecordingsModalOpen(true);
        }}
      >
        View Past Recordings
      </button>
      <h2>Tap the button below to record yourself for feedback</h2>
      <VoiceRecorder handleClick={handleRecord} isRecording={isRecording} />
      {isFeedbackReady && (
        <FeedbackBox feedback={feedback} audioURL={audioURL} />
      )}
    </div>
  );
}

export default App;

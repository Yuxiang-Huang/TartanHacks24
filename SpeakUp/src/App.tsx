import React, { useState } from "react";
import "./App.css";
import "./css/global.css";
import "./components/VoiceRecorder";
import VoiceRecorder from "./components/VoiceRecorder";
import TextBox from "./components/TextBox";
import PastRecordingsModal from "./components/PastRecordingsModal";
import LoginButton from "./components/LoginButton";
import LoginModal from "./components/LoginModal";

export interface TextSegment {
  text: string;
  rating: number;
}

function App() {
  const [isPastRecordingsModalOpen, setIsPastRecordingsModalOpen] =
    useState(false);
  // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        className="transition ease-in-out border-black border px-3 py-1 hover:rounded-xl hover:scale-110 hover:font-special"
        onClick={() => setIsPastRecordingsModalOpen(true)}
      >
        View Past Recordings
      </button>

      <svg
        height="18em"
        className="mx-auto w-1/2 min-w-100 min-h-24"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(45)">
            <stop offset="5%" stopColor="pink" />
            <stop offset="95%" stopColor="red" />
          </linearGradient>
        </defs>
        <circle className="" r="100" cx="50%" cy="50%" fill="url(#gradient)" />
      </svg>
      <TextBox
        textSegments={[
          { text: "Hi ", rating: 1 },
          { text: "my name ", rating: 0 },
          { text: "is ", rating: 0.4 },
          { text: "Zachary Fan ", rating: 0.8 },
        ]}
      />
      <VoiceRecorder></VoiceRecorder>
    </div>
  );
}

export default App;

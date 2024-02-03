import React from "react";
import "./App.css";
import "./css/global.css";

function App() {
  return (
    <div className="text-center">
      <h1>SpeakUP</h1>
      <svg height="24em" className="mx-auto w-1/2 min-w-100 min-h-24" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(45)">
            <stop offset="5%" stop-color="pink" />
            <stop offset="95%" stop-color="red" />
          </linearGradient>
        </defs>
        <circle r="150" cx="50%" cy="50%" fill="url(#gradient)" />

      </svg>
    </div>
  );
}

export default App;

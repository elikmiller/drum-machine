import React from "react";
import AudioContextProvider from "./providers/AudioContext";
import DrumMachine from "./components/DrumMachine";
import "./App.css";

const App = () => {
  return (
    <AudioContextProvider>
      <DrumMachine />
    </AudioContextProvider>
  );
};

export default App;

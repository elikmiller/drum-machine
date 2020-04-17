import React from "react";
import AudioContextProvider from "./AudioContext";
import DrumMachine from "./DrumMachine";
import "./App.css";

const App = () => {
  return (
    <div>
      <AudioContextProvider>
        <DrumMachine />
      </AudioContextProvider>
    </div>
  );
};

export default App;

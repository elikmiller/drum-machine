import React, { useContext, useRef, useState } from "react";
import DrumMachine from "../DrumMachine";

const ReactAudioContext = React.createContext();

const AudioContextProvider = ({ children }) => {
  const drumMachine = useRef(
    new DrumMachine({
      onTempoChange: (tempo) => {
        setTempo(tempo);
      },
      onIsPlayingChange: (isPlaying) => {
        setIsPlaying(isPlaying);
      },
      onNotePlayed: (noteIndex) => {
        setLastNotePlayed(noteIndex);
      },
      onPatternChange: (pattern) => {
        setPattern(pattern);
      },
    })
  );

  const [tempo, setTempo] = useState(drumMachine.current.tempo);
  const [isPlaying, setIsPlaying] = useState(drumMachine.current.isPlaying);
  const [lastNotePlayed, setLastNotePlayed] = useState(
    drumMachine.current.current16thNote
  );
  const [pattern, setPattern] = useState(drumMachine.current.pattern);

  return (
    <ReactAudioContext.Provider
      value={{
        drumMachine: drumMachine.current,
        tempo,
        isPlaying,
        lastNotePlayed,
        pattern,
      }}
    >
      {children}
    </ReactAudioContext.Provider>
  );
};

const useAudioContext = () => {
  const context = useContext(ReactAudioContext);
  if (context === undefined) {
    throw new Error(
      "useAudioContext must be used within an AudioContextProvider"
    );
  }
  return context;
};

export { AudioContextProvider as default, useAudioContext };

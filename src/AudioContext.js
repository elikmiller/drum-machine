import React, { useContext, useEffect } from "react";
import axios from "axios";

const _audioContext = new AudioContext();
const ReactAudioContext = React.createContext();

let audioData = {};
const clips = [
  "clap",
  "clave",
  "conga",
  "cowbell",
  "hihatopen",
  "maracas",
  "ride",
  "rim",
  "stick",
  "tom",
  "snare",
  "kick",
  "hihat",
];

const playSound = (clip) => {
  let source = _audioContext.createBufferSource();
  source.buffer = audioData[clip];
  source.connect(_audioContext.destination);
  source.start(0);
};

const AudioContextProvider = ({ children }) => {
  useEffect(() => {
    for (let clip of clips) {
      axios
        .get(process.env.PUBLIC_URL + `/clips/${clip}.wav`, {
          responseType: "arraybuffer",
        })
        .then((result) => {
          return _audioContext.decodeAudioData(result.data);
        })
        .then((result) => {
          audioData[clip] = result;
        });
    }
  }, []);

  return (
    <ReactAudioContext.Provider value={{ _audioContext, clips, playSound }}>
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

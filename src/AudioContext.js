import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const _audioContext = new AudioContext();
const ReactAudioContext = React.createContext();

let audioData = {};
const clips = [
  "china",
  "crash_a",
  "crash_b",
  "crash_c",
  "hihat",
  "hihat_open",
  "kick_a",
  "kick_b",
  "kick_ghost",
  "ride",
  "snare_a",
  "snare_b",
  "splash",
  "tom_high",
  "tom_low",
  "tom_mid",
];

const playSound = (clip, start = 0) => {
  let currentTime = _audioContext.currentTime;
  let source = _audioContext.createBufferSource();
  source.buffer = audioData[clip];
  source.connect(_audioContext.destination);
  if (start === 0) source.start(0);
  else source.start(currentTime + start);
};

const AudioContextProvider = ({ children }) => {
  const [tempo, setTempo] = useState(90);
  const sequence = {
    hihat: [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
    ],
    snare_a: [
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
    ],
    kick_a: [
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  };
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

  const playSequence = () => {
    for (let i = 0; i < 16; i++) {
      for (let clip of Object.keys(sequence)) {
        if (sequence[clip][i]) {
          playSound(clip, (60 / (tempo * 4)) * i);
        }
      }
    }
  };

  return (
    <ReactAudioContext.Provider
      value={{ _audioContext, tempo, setTempo, clips, playSound, playSequence }}
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

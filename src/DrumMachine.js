import React from "react";
import { useAudioContext } from "./AudioContext";

const Pad = ({ clip }) => {
  const audioContext = useAudioContext();
  return (
    <button
      className="Pad"
      onClick={() => {
        audioContext.playSound(clip);
      }}
      key={clip}
      type="button"
    >
      {clip}
    </button>
  );
};

const DrumMachine = () => {
  const audioContext = useAudioContext();

  return (
    <div>
      {audioContext.clips.map((clip) => (
        <Pad clip={clip} key={clip} />
      ))}
    </div>
  );
};

export default DrumMachine;

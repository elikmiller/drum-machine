import React from "react";
import { useAudioContext } from "./AudioContext";

const Pad = ({ clip }) => {
  const audioContext = useAudioContext();
  if (!clip)
    return (
      <button className="Pad" type="button">
        <em>Unassigned</em>
      </button>
    );
  return (
    <button
      className="Pad"
      onMouseDown={() => {
        audioContext.playSound(clip);
      }}
      type="button"
    >
      {clip}
    </button>
  );
};

const DrumMachine = () => {
  const audioContext = useAudioContext();

  return (
    <div className="DrumMachine">
      <div className="PadController">
        <div className="DrumMachine-logo">
          <strong>DRUM</strong>MACHINE
        </div>
        {audioContext.clips.map((clip, i) => (
          <React.Fragment key={i}>
            <Pad clip={clip} />
            {(i + 1) % 4 === 0 && <br />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DrumMachine;

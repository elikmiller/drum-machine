import React from "react";
import { useAudioContext } from "../providers/AudioContext";

const DrumMachine = () => {
  const audioContext = useAudioContext();

  return (
    <div>
      <label htmlFor="tempo">Tempo: </label>
      <input
        type="range"
        min="20"
        max="300"
        value={audioContext.tempo}
        onChange={(e) =>
          audioContext.drumMachine.setTempo(parseFloat(e.target.value))
        }
      ></input>
      <input
        type="number"
        value={audioContext.tempo}
        onChange={(e) =>
          audioContext.drumMachine.setTempo(parseFloat(e.target.value))
        }
      />
      <button
        type="button"
        onClick={() => audioContext.drumMachine.startStop()}
      >
        {audioContext.isPlaying ? "Stop" : "Play"}
      </button>
      <div style={{ display: "flex", marginTop: "20px" }}>
        {audioContext.pattern.map((patternNote, i) => {
          return (
            <div
              key={i}
              style={{
                height: "20px",
                width: "20px",
                margin: "0 10px",
                backgroundColor:
                  audioContext.lastNotePlayed === (i + 1) % 16
                    ? "blue"
                    : patternNote
                    ? "white"
                    : "gray",
              }}
              onClick={() => {
                const newPattern = audioContext.pattern.map((item, index) => {
                  if (index !== i) {
                    // This isn't the item we care about - keep it as-is
                    return item;
                  }

                  // Otherwise, this is the one we want - return an updated value
                  return !item;
                });
                audioContext.drumMachine.setPattern(newPattern);
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default DrumMachine;

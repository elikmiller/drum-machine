import React from "react";
import NoteToggleButton from "./NoteToggleButton";

const TrackArray = ({ trackName, trackNotes, lastNotePlayed, isPlaying, toggleNote }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        border: "1px solid rgba(255, 255, 255, 0.75)",
        borderRadius: "4px",
      }}
    >
      {trackNotes.map((note, i) => (
        <NoteToggleButton
          key={i}
          index={i}
          isActive={note}
          isPlaying={(i + 1) % 16 === lastNotePlayed}
          onClick={() => toggleNote(trackName, i)}
        />
      ))}
    </div>
  );
};

export default TrackArray;

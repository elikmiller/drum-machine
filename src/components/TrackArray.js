import React from "react";
import NoteToggleButton from "./NoteToggleButton";

const TrackArray = ({ trackName, trackNotes, lastNotePlayed, isPlaying, toggleNote }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px",
        padding: "5px",
        border: "1px solid rgba(255, 255, 255, 0.75)",
        borderRadius: "4px",
      }}
    >
      <div style={{ minWidth: "96px" }}>{trackName}</div>
      {trackNotes.map((note, i) => (
        <NoteToggleButton key={i} isActive={note} isPlaying={(i + 1) % 16 === lastNotePlayed} onClick={() => toggleNote(trackName, i)} />
      ))}
    </div>
  );
};

export default TrackArray;

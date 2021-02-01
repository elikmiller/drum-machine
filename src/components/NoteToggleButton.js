import React from "react";

const NoteToggleButton = ({ isActive, isPlaying, onClick }) => {
  return (
    <div
      style={{
        height: "16px",
        minWidth: "16px",
        margin: "0 8px",
        borderRadius: "1px",
        backgroundColor: isPlaying ? "#1e87f0" : isActive ? "#32d296" : "#f8f8f8",
      }}
      onClick={onClick}
    ></div>
  );
};

export default NoteToggleButton;

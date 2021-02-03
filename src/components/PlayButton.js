import React from "react";

const PlayButton = ({ isPlaying, onClick }) => {
  return (
    <div className="play-button-component">
      <button
        type="button"
        className="uk-button uk-button-primary"
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === " ") e.preventDefault();
        }}
      >
        {isPlaying ? "Stop" : "Play"}
      </button>
    </div>
  );
};

export default PlayButton;

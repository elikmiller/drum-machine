import React from "react";
import TrackArray from "./TrackArray";

const PatternGrid = ({ pattern, lastNotePlayed, isPlaying, toggleNote }) => {
  return (
    <div className="uk-margin-small uk-background-secondary uk-light uk-padding">
      {Object.keys(pattern).map((track) => (
        <TrackArray
          key={track}
          trackName={track}
          trackNotes={pattern[track]}
          lastNotePlayed={lastNotePlayed}
          isPlaying={isPlaying}
          toggleNote={toggleNote}
        />
      ))}
    </div>
  );
};

export default PatternGrid;

import React from "react";
import IndicatorLight from "./IndicatorLight";
import classNames from "classnames";
import "./NoteToggleButton.scss";
import PlayingIndicator from "./PlayingIndicator";

const NoteToggleButton = ({ isActive, isPlaying, onClick, index }) => {
  const noteToggleButtonClasses = classNames({
    noteToggleButton: true,
    "noteToggleButton-red": Math.floor(index / 4) === 0,
    "noteToggleButton-orange": Math.floor(index / 4) === 1,
    "noteToggleButton-yellow": Math.floor(index / 4) === 2,
    "noteToggleButton-white": Math.floor(index / 4) === 3,
  });

  return (
    <div>
      <div className={noteToggleButtonClasses} onClick={onClick}>
        <IndicatorLight isActive={isActive} />
      </div>
      <PlayingIndicator isPlaying={isPlaying} />
    </div>
  );
};

export default NoteToggleButton;

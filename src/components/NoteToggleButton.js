import React from "react";
import IndicatorLight from "./IndicatorLight";
import classNames from "classnames";
import "./NoteToggleButton.scss";

const NoteToggleButton = ({ isActive, isPlaying, onClick, index }) => {
  const noteToggleButtonClasses = classNames({
    noteToggleButton: true,
    "noteToggleButton-playing": isPlaying,
    "noteToggleButton-red": Math.floor(index / 4) === 0,
    "noteToggleButton-orange": Math.floor(index / 4) === 1,
    "noteToggleButton-yellow": Math.floor(index / 4) === 2,
    "noteToggleButton-white": Math.floor(index / 4) === 3,
  });

  return (
    <div className={noteToggleButtonClasses} onClick={onClick}>
      <IndicatorLight isActive={isActive} />
    </div>
  );
};

export default NoteToggleButton;

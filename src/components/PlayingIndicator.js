import React from "react";
import className from "classnames";
import "./PlayingIndicator.scss";

const PlayingIndicator = ({ isPlaying }) => {
  const PlayingIndicatorClass = className({
    PlayingIndicator: true,
    "PlayingIndicator-playing": isPlaying,
  });
  return <div className={PlayingIndicatorClass} />;
};

export default PlayingIndicator;

import React, { useEffect, useRef, useState } from "react";
import PlayButton from "./PlayButton";
import TempoControl from "./TempoControl";
import DrumMachine from "../DrumMachine";
import TrackArray from "./TrackArray";
import InstrumentSelect from "./InstrumentSelect";

const DrumMachineContainer = () => {
  const drumMachine = useRef(null);
  const [tempo, setTempo] = useState(80);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastNotePlayed, setLastNotePlayed] = useState(null);
  const [pattern, setPattern] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState("clap");

  useEffect(() => {
    drumMachine.current = new DrumMachine({
      onTempoChange: (tempo) => {
        setTempo(tempo);
      },
      onIsPlayingChange: (isPlaying) => {
        setIsPlaying(isPlaying);
      },
      onNotePlayed: (noteIndex) => {
        setLastNotePlayed(noteIndex);
      },
      onPatternChange: (pattern) => {
        setPattern(pattern);
      },
      onLoadingDone: () => {
        setLoading(false);
      },
    });
    setTempo(drumMachine.current.tempo);
    setIsPlaying(drumMachine.current.isPlaying);
    setLastNotePlayed(drumMachine.current.current16thNote);
    setPattern(drumMachine.current.pattern);
  }, []);

  useEffect(() => {
    const togglePlaybackOnSpacebarPress = (e) => {
      if (e.key === " ") {
        togglePlayback();
      }
    };
    window.addEventListener("keydown", togglePlaybackOnSpacebarPress);
    return () => {
      window.removeEventListener("keydown", togglePlaybackOnSpacebarPress);
    };
  }, []);

  const togglePlayback = () => {
    drumMachine.current.startStop();
  };

  const toggleNote = (track, noteIndex) => {
    const newPattern = Object.assign({}, pattern);
    newPattern[track][noteIndex] = !newPattern[track][noteIndex];
    drumMachine.current.setPattern(newPattern);
  };

  return (
    <>
      <div className="uk-flex uk-background-muted uk-margin-small uk-flex-middle">
        <div className="uk-padding-small">Drum Machine App</div>
        <div className="uk-flex-1"></div>
        <div className="uk-padding-small">
          <TempoControl value={tempo} onChange={(tempo) => drumMachine.current.setTempo(tempo)} />
        </div>
        <div className="uk-padding-small">
          <PlayButton isPlaying={isPlaying} onClick={togglePlayback} />
        </div>
      </div>
      {loading ? (
        <div className="uk-margin uk-text-center">
          <div uk-spinner={"true"}></div>
        </div>
      ) : (
        <>
          <div className="uk-background-secondary uk-light uk-padding-large">
            <div style={{ display: "flex" }}>
              <div
                style={{
                  flex: "1 1 0",
                  border: "1px solid rgba(255, 255, 255, 0.75)",
                  borderRadius: "2px",
                  padding: "1em",
                }}
              >
                <InstrumentSelect tracks={Object.keys(pattern)} value={currentTrack} onChange={setCurrentTrack} />
              </div>
              <div
                style={{
                  display: "flex",
                  flex: "2 1 0",
                  border: "1px solid rgba(255, 255, 255, 0.75)",
                  borderRadius: "2px",
                }}
              >
                <div
                  style={{
                    flex: "1 1 0",
                    border: "1px solid rgba(255, 255, 255, 0.75)",
                    borderRadius: "2px",
                  }}
                />
                <div
                  style={{
                    flex: "1 1 0",
                    border: "1px solid rgba(255, 255, 255, 0.75)",
                    borderRadius: "2px",
                  }}
                />
                <div
                  style={{
                    flex: "1 1 0",
                    border: "1px solid rgba(255, 255, 255, 0.75)",
                    borderRadius: "2px",
                  }}
                />
                <div
                  style={{
                    flex: "1 1 0",
                    border: "1px solid rgba(255, 255, 255, 0.75)",
                    borderRadius: "2px",
                  }}
                />
                <div
                  style={{
                    flex: "1 1 0",
                    border: "1px solid rgba(255, 255, 255, 0.75)",
                    borderRadius: "2px",
                  }}
                />
                <div
                  style={{
                    flex: "1 1 0",
                    border: "1px solid rgba(255, 255, 255, 0.75)",
                    borderRadius: "2px",
                  }}
                />
                <div
                  style={{
                    flex: "1 1 0",
                    border: "1px solid rgba(255, 255, 255, 0.75)",
                    borderRadius: "2px",
                  }}
                />
                <div
                  style={{
                    flex: "1 1 0",
                    border: "1px solid rgba(255, 255, 255, 0.75)",
                    borderRadius: "2px",
                  }}
                />
                <div
                  style={{
                    flex: "1 1 0",
                    border: "1px solid rgba(255, 255, 255, 0.75)",
                    borderRadius: "2px",
                  }}
                />
                <div
                  style={{
                    flex: "1 1 0",
                    border: "1px solid rgba(255, 255, 255, 0.75)",
                    borderRadius: "2px",
                  }}
                />
                <div
                  style={{
                    flex: "1 1 0",
                    border: "1px solid rgba(255, 255, 255, 0.75)",
                    borderRadius: "2px",
                  }}
                />
              </div>
            </div>

            <TrackArray
              trackName={currentTrack}
              trackNotes={pattern[currentTrack]}
              lastNotePlayed={lastNotePlayed}
              isPlaying={isPlaying}
              toggleNote={toggleNote}
            />
          </div>
          {/* <PatternGrid pattern={pattern} lastNotePlayed={lastNotePlayed} isPlaying={isPlaying} toggleNote={toggleNote} /> */}
        </>
      )}
    </>
  );
};

export default DrumMachineContainer;

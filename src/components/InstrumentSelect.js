import React from "react";
import "./InstrumentSelect.scss";

const InstrumentSelect = ({ value, onChange, tracks }) => {
  const handleOnChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="instrumentSelect">
      <label>
        Instrument <br />
        <select value={value} onChange={handleOnChange}>
          {tracks.map((track) => (
            <option key={track} value={track}>
              {track}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default InstrumentSelect;

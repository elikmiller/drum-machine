import React from "react";

const TempoControl = ({ value, onChange }) => {
  const handleTempoChange = (e) => {
    let newTempo = parseFloat(e.target.value);
    onChange(newTempo);
  };

  return (
    <div className="tempo-control-component">
      <div className="uk-form-controls">
        <input
          id="tempo"
          className="uk-input"
          type="number"
          placeholder="Tempo"
          aria-label="Tempo"
          min={20}
          max={300}
          step={1}
          value={value}
          onChange={handleTempoChange}
        />
      </div>
    </div>
  );
};

export default TempoControl;

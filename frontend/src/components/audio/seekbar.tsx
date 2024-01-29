import React, { useState, useEffect } from 'react';

const Seekbar = ({ duration, onSeekChange }) => {
  const [seek, setSeek] = useState(0);

  const handleSeekChange = (e) => {
    const newSeek = parseFloat(e.target.value);
    setSeek(newSeek);
    onSeekChange(newSeek);
  };

  useEffect(() => {
    setSeek(0);
  }, [duration]);

  return (
    <input
      className="seek-slider"
      type="range"
      min="0"
      max={duration}
      step="1"
      value={seek}
      onChange={handleSeekChange}
    />
  );
};

export default Seekbar;

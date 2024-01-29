import React, { useState, useEffect } from 'react';
import Seekbar from './seekbar';
import './audio.css';

const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [seek, setSeek] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = React.useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.currentTime = seek;
    }
  }, [volume, seek]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setSeek(audioRef.current.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(audioRef.current.duration);
    };

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('durationchange', handleDurationChange);

    return () => {
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.removeEventListener(
        'durationchange',
        handleDurationChange
      );
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleSeekChange = (newSeek) => {
    setSeek(newSeek);
    audioRef.current.currentTime = newSeek;
  };

  return (
    <div className="audio-player">
      <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
      <input
        className="volume-slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
      <Seekbar duration={duration} onSeekChange={handleSeekChange} />
      <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} />
    </div>
  );
};

export default AudioPlayer;

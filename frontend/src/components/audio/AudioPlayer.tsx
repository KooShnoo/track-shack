import React, { useState, useEffect, useRef } from 'react';
import './AudioPlayer.css';
import pause from '/pause.svg';
import play from '/play.svg';

const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      // Update the seek bar based on the current time
      const seekBar = document.getElementById('seekBar');
      seekBar.value = audio.currentTime;
    };

    const handleVolumeChange = () => {
      // Update the volume bar based on the current volume
      const volumeBar = document.getElementById('volumeBar');
      volumeBar.value = audio.volume;
    };

    const handleEnd = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('volumechange', handleVolumeChange);
    audio.addEventListener('end', handleEnd);

    return () => {
      // Cleanup: Remove event listeners when the component unmounts
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('volumechange', handleVolumeChange);
      audio.removeEventListener('end', handleEnd);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audioRef.current) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (value) => {
    const audio = audioRef.current;
    audio.currentTime = value;
  };

  const handleVolumeChange = (value) => {
    const audio = audioRef.current;
    audio.volume = value;
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={src}></audio>

      <div className="audio-buttons" onClick={togglePlay}>
        {isPlaying ? (
          <i className="fa-solid fa-circle-pause"></i>
        ) : (
          <i className="fa-solid fa-circle-play fa-lg"></i>
        )}
      </div>
      <div className="slider-bar">
        <input
          id="seekBar"
          type="range"
          min="0"
          max={audioRef.current ? audioRef.current.duration : '100'}
          step="1"
          onChange={(e) => handleSeek(e.target.value)}
        />
        <input
          id="volumeBar"
          type="range"
          min="0"
          max="1"
          step="0.01"
          defaultValue=".5"
          onChange={(e) => handleVolumeChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;

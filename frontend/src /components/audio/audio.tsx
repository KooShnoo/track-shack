import { useState, useEffect } from 'react';
import { Howl } from 'howler';

const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [seek, setSeek] = useState(0);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    setSound(new Howl({ src, volume, onend: () => setIsPlaying(false) }));
    return () => {
      sound && sound.unload();
    };
  }, [src, volume]);

  const togglePlay = () => {
    if (sound) {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolume = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (sound) {
      sound.volume(newVolume);
    }
  };

  const handleSeekChange = (e) => {
    const newSeek = parseFloat(e.target.value);
    setSeek(newSeek);
    if (sound) {
      sound.seek(newSeek);
    }
  };

  return (
    <div className="audio-player">
      <button onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
        <input
          type="range"
          min="0"
          max={sound ? sound.duration() : 0}
          step="1"
          value={seek}
          onChange={handleSeekChange}
        />
      </button>
    </div>
  );
};

export default AudioPlayer;

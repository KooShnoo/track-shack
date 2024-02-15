import { useEffect, useState, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import pause from '/pause.svg';
import play from '/play.svg';

import './AudioPlayer.css';

function AudioPlayer({ src, trackId }) {
  const waveformId = `#myWaveForm`;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  useEffect(() => {
    const song = WaveSurfer.create({
      container: `.waveForm-${trackId}`,
      height: 30,
      waveColor: 'rgb(0, 0, 0)',
      barRadius: 50,
      fillParent: true,
      dragToSeek: true,
      hideScrollbar: true,
      normalize: true,
      mediaControls: true,
      responsive: true,
      url: src,
    });

    song.on('finish', () => {
      setIsPlaying(false);
      song.seekTo(0);
    });

    audioRef.current = song;

    return () => {
      song.destroy();
    };
  }, [src, waveformId]);

  // const togglePlay = () => {
  //   if (audioRef.current) {
  //     if (isPlaying) {

  //     }
  //   }

  //   if (song.current) {
  //     if (isPlaying) {
  //       audio.pause();
  //     } else {
  //       audio.play();
  //     }
  //     setIsPlaying(!isPlaying);
  //   }
  // };

  return (
    <div className="waveform-container">
      {/* <div className="audio-buttons" onClick={togglePlay}>
        {isPlaying ? (
          <i className="fa-solid fa-circle-pause"></i>
        ) : (
          <i className="fa-solid fa-circle-play fa-lg"></i>
        )}
      </div> */}
      <div className="play-container">
        <div id={waveformId} className={`waveForm-${trackId}`}></div>
      </div>
    </div>
  );
}

export default AudioPlayer;

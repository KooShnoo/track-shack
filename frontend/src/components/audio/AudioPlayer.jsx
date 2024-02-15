import { useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

import './AudioPlayer.css';

function AudioPlayer({ src, trackId }) {
  const waveformId = `#myWaveForm`;
  const [isPlaying, setIsPlaying] = useState(false);
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

    return () => {
      song.destroy();
    };
  }, [src, waveformId]);

  return (
    <div className="waveform-container">
      <div className="play-container">
        <div id={waveformId} className={`waveForm-${trackId}`}></div>
      </div>
    </div>
  );
}

export default AudioPlayer;

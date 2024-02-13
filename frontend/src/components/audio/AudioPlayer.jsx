import { useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import './AudioPlayer.css';

function AudioPlayer({ src, trackId }) {
  console.log('this is a console log for the source', src);

  const waveformId = `#myWaveForm`;
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const song = WaveSurfer.create({
      container: `.waveForm-${trackId}`,
      height: 50,
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
    <div className="play-container">
      <div id={waveformId} className={`waveForm-${trackId}`}></div>
    </div>
  );
}

export default AudioPlayer;

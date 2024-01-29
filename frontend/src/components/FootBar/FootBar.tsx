import React from 'react';
import AudioPlayer from '../audio/audio';
import audio_one from '../../assets/audio/audio_one.wav';
import './FootBar.css';

const FootBar = () => {
  return (
    <div>
      <footer className="audio-container">
        <AudioPlayer src={audio_one} />
      </footer>
    </div>
  );
};

export default FootBar;

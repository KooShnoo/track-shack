import './trackMasterDisplay.css';
import AudioPlayer from '../audio/AudioPlayer';
import { useEffect, useState } from 'react';

const TrackMasterDisplay = ({ track }) => {
  const [currentTrack, setCurrentTrack] = useState(track);

  useEffect(() => {
    if (track) setCurrentTrack(track);
  }, [track]);

  return (
    <div className="track-info-container">
      <div className="track-items">
        <div className="description-container">
          <h1 className="title">{currentTrack?.title}</h1>
          <p className="body">{currentTrack?.description}</p>
        </div>
        <div className="image-container">
          <img src={currentTrack?.albumArtSrc} alt="" />
        </div>
      </div>
      <div className="audio-button-container">
        <div className="audio-player-container">
          {/* should  not render unless defined (maybe a loading state?) */}
          <AudioPlayer
            src={currentTrack?.audioMasterSrc}
            trackId={currentTrack?._id}
          />
          <a
            className="download-button"
            download
            href={currentTrack?.audioStemsSrc}
          >
            <button className="audio-player-button">Download</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrackMasterDisplay;

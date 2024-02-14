import './trackMasterDisplay.css';
import AudioPlayer from '../audio/AudioPlayer';

const TrackMasterDisplay = ({ track }) => {

  console.log('TRACK', track?.albumArtSrc)
  return (
    <div className="track-info-container">
      <div className="track-items">
        <div className="description-container">
          <h1 className="title">{track?.title}</h1>
          <p className="body">{track?.description}</p>
        </div>
        <div className="image-container">
          {/* <img src="/defaultAlbumArt.png" alt="" /> */}
          <img src={track?.albumArtSrc || '/defaultAlbumArt.png'} alt="" />
        </div>
      </div>
      <div className="audio-button-container">
        <div className="audio-player-container">
          <AudioPlayer src={track?.audioMasterSrc} />
          <a className="download-button" download href={track?.audioStemsSrc}>
            <button className="audio-player-button">Download</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrackMasterDisplay;

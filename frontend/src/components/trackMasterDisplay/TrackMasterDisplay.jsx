import './trackMasterDisplay.css';
import FaceSmall from './Face_Small.jpg';
import AudioPlayer from '../audio/AudioPlayer';

const TrackMasterDisplay = ({track}) => {
  return (
    <div>
      <div className="track-info-container">
        <div className="track-items">
          <div className="description-container">
            <h1 className="title">{track?.title}</h1>
            <p className="body">{track?.description}</p>
          </div>
          <div className="image-container">
            <img src={FaceSmall} alt="" />
          </div>
        </div>
        <div className="button-container">
          <AudioPlayer />
          <button>Download</button>
        </div>
      </div>
    </div>
  );
};

export default TrackMasterDisplay;

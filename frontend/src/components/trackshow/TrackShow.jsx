import AudioResponse from '../audioResponse/AudioResponse';
import TrackMasterDisplay from '../trackMasterDisplay/TrackMasterDisplay';
import './trackShow.css';
import CommentsContainer from '../commentsContainer/CommentsContainer';

const TrackShow = () => {
  return (
    <div className="track-show-page">
      <div className="track-left-container">
        <div className="master-project">
          <TrackMasterDisplay />
        </div>
        <div className="audio-responses-container">
          <AudioResponse />
          <AudioResponse />
          <AudioResponse />
          <AudioResponse />
        </div>
      </div>
      <div className="track-right-container">
        <CommentsContainer />
      </div>
    </div>
  );
};

export default TrackShow;

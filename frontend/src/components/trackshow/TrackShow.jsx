import AudioResponse from '../audioResponse/AudioResponse';
import TrackMasterDisplay from '../trackMasterDisplay/TrackMasterDisplay';
import './trackShow.css';
import CommentsContainer from '../commentsContainer/CommentsContainer';

const TrackShow = () => {
  return (
    <div className="track-show-page">
      <div className="left-track-container">
        <h1>looking for little guitar boys</h1>
        <TrackMasterDisplay />
        <div className="audio-responses-container">
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

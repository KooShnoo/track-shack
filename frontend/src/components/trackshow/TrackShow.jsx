import AudioResponse from "../audioResponse/AudioResponse";
import TrackMasterDisplay from "../TrackMasterDisplay/TrackMasterDisplay";
import "./trackShow.css";


const TrackShow = () => {
  return (
    <div className="track-show-page">
      <div className="left-container">
        <div className="master-project">
            <TrackMasterDisplay/>
        </div>
        <div className="audio-responses-container">
          <AudioResponse />
          <AudioResponse />
          <AudioResponse />
          <AudioResponse />
        </div>
      </div>
    </div>
  );
};

export default TrackShow;

import "./trackMasterDisplay.css";

const TrackMasterDisplay = ({track}) => {
  return (
      <div className="track-master-container">
        <div className="title-description">
          <div className="title">
            <h1>{track?.title}</h1>
          </div>
          <div className="description-container">
            <p className="description">
             {track?.description}
            </p>
          </div>
          <div className="buttons-container">
            <div className="download-stems-container">
                <div className="download-stems-button">
              <span className="download-stems">Download Stems</span>

                </div>
            </div>
          </div>
        </div>
        <div className="image-container">
          <img src={track?.albumArtSrc} alt="" className="art" />
        </div>
      </div>
  );
};

export default TrackMasterDisplay;

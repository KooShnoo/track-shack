import "./trackMasterDisplay.css";

const TrackMasterDisplay = () => {
  return (
      <div className="track-master-container">
        <div className="title-description">
          <div className="title">
            <h1>TITLE</h1>
          </div>
          <div className="description-container">
            <p className="description">
              Descriptionnnnnnn hihihifhlkdfaldsjflkasjfl asdjf
              lkasd;fjasld;kfjlkasdjflasd
              flkasdjfla;skdjflkasdjflkadsjfladsjfladsjl;fajsdl;kfjal;sdkfj
              l;kasdj fl;kasdjfl;kasdjf{" "}
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
          <img src="../../../DnG2.png" alt="" className="art" />
        </div>
      </div>
  );
};

export default TrackMasterDisplay;
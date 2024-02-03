import './audioResponse.css';
import AudioPlayer from '../audio/AudioPlayer';


const AudioResponse = ({response}) => {

  // if (response) console.log(response)

  return (
    <div className="audio-response-container">
      <div className="leftSide">
        <div className="response-text">
          <h1>{response?.description}</h1>
        </div>
        <AudioPlayer src={response?.audioMasterSrc} />
      </div>
      <div className="dl-button-container">
        <a href={response?.audioStemsSrc} className="button-anchor">
          <button onClick>download</button>
        </a>
      </div>
    </div>
  );
};

export default AudioResponse;

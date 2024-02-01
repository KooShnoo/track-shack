import './audioResponse.css';
import AudioPlayer from '../audio/AudioPlayer';
import audio_one from '../../assets/audio/audio_one.wav';

const AudioResponse = () => {
  return (
    <div className="audio-response-container">
      <div className="response-text">
        <h1>Hi I am Audio Response</h1>
        <h3>little song for little man</h3>
      </div>
      <AudioPlayer src={audio_one} />
    </div>
  );
};

export default AudioResponse;

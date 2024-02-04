import './audioResponse.css';
import AudioPlayer from '../audio/AudioPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTrackReply } from '../../store/trackPostReply';

const AudioResponse = ({ response, trackId }) => {
  const currentUserId = useSelector((state) => state.session.user?._id);
  const dispatch = useDispatch();

  console.log('RESPONSE ID', response?._id);
  const handleDelete = () => {
    dispatch(deleteTrackReply(response?._id, trackId));
  };

  return (
    <div className="audio-response-container">
      <div className="leftSide">
        <div className="response-text">
          <h1>{response?.description}</h1>
        </div>
        <AudioPlayer src={response?.audioMasterSrc} />
      </div>
      <div className="dl-button-container">
        {currentUserId === response.author._id && (
          <button onClick={handleDelete} className='audio-player-delete'>Delete</button>
        )}
        <a href={response?.audioStemsSrc} className="button-anchor">
          <button onClick className="audio-player-button">
            Download
          </button>
        </a>
      </div>
    </div>
  );
};

export default AudioResponse;

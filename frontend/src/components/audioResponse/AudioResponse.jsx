import './audioResponse.css';
import AudioPlayer from '../audio/AudioPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTrackReply } from '../../store/trackPostReply';
import { useNavigate } from 'react-router-dom';

const AudioResponse = ({ response, trackId }) => {
  const currentUserId = useSelector((state) => state.session.user?._id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteTrackReply(response?._id, trackId));
  };

    const handleNav = () => {
      navigate(`/profile/${response?.author._id}`);
    };

  return (
    <div className="audio-response-container">
      <div className="leftSide">
        <div className="response-text">
          <h3 onClick={handleNav}>From: {response?.author.username}</h3>
          <p>{response?.description}</p>
        </div>
        <AudioPlayer src={response?.audioMasterSrc} trackId={response?._id} />
      </div>
      <div className="dl-button-container">
        {currentUserId === response.author._id && (
          <button onClick={handleDelete} className="audio-player-delete">
            Delete
          </button>
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

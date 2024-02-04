import AudioResponse from '../audioResponse/AudioResponse';
import TrackMasterDisplay from '../trackMasterDisplay/TrackMasterDisplay';
import './trackShow.css';
import CommentsContainer from '../commentsContainer/CommentsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTrack } from '../../store/trackPost';
import { useNavigate, useParams } from 'react-router-dom';
import AudioResponseForm from '../audioResponseForm/AudioResponseForm';
import { deleteTrack } from '../../store/trackPost';
import TrackPostEdit from '../audioResponseForm/TrackPostEdit/TrackPostEdit';

const TrackShow = () => {
  const dispatch = useDispatch();
  const { trackId } = useParams();
  const track = useSelector((state) => state.trackPosts[trackId]);
  const [showForm, setShowForm] = useState(false);
  const audioResponses = track?.responses;
  const currentUserId = useSelector((state) => state.session.user?._id);
  const navigate = useNavigate();

  if (currentUserId) console.log('USER ID', currentUserId, track?.author);

  useEffect(() => {
    dispatch(getTrack(trackId));
  }, [dispatch, trackId]);

  const handleDeleteTrack = () => {
    console.log('vussup');
    let result = dispatch(deleteTrack(trackId));
    if (result) navigate('/');
  };

  return (
    <div className="track-show-page">
      <div className="left-track-container">
        {currentUserId === track?.author && (
          <div>
            <p onClick={() => setShowForm('edit')}>EDIT</p>{' '}
            <p onClick={handleDeleteTrack}>DELETE</p>
          </div>
        )}
        <TrackMasterDisplay track={track} />
        <div className="audio-responses-container">
          {audioResponses?.map((response) => (
            <AudioResponse
              response={response}
              trackId={trackId}
              key={response._id}
            />
          ))}
        </div>
      </div>
      <div className="track-right-container">
        <div className="track-right-header">
          {' '}
          <button
            className="comment-button"
            onClick={() => setShowForm('audioReply')}
          >
            Create Audio Reply
          </button>
          <button
            className="comment-button"
            onClick={() => setShowForm('comments')}
          >
            Create Comment
          </button>
        </div>
        {showForm === 'audioReply' && (
          <AudioResponseForm trackId={trackId} setShowForm={setShowForm} />
        )}
        {showForm === 'comments' && <CommentsContainer trackId={trackId} />}
        {showForm === 'edit' && <TrackPostEdit />}
      </div>
    </div>
  );
};

export default TrackShow;

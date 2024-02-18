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
// import { getUserTracks } from '../../store/trackPost';

const TrackShow = () => {
  const dispatch = useDispatch();
  const { trackId } = useParams();
  const track = useSelector((state) => state.trackPosts[trackId]);
  const loggedIn = useSelector((state) => !!state.session.user);
  const [showForm, setShowForm] = useState('comments');
  const audioResponses = track?.responses;
  const currentUserId = useSelector((state) => state.session.user?._id);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTrack(trackId));
  }, [dispatch, trackId]);

  const handleDeleteTrack = () => {
    let result = dispatch(deleteTrack(trackId));
    if (result) navigate('/');
  };

  return (
    <div className="track-show-page">
      <div className="left-track-container">
        {currentUserId === track?.author._id && (
          <div className="left-button-container">
            <button id="edit-track-button" onClick={() => setShowForm('edit')}>
              Edit Track
            </button>{' '}
            <button id="delete-track-button" onClick={handleDeleteTrack}>
              Delete Track
            </button>
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
        {showForm === 'comments' && <CommentsContainer trackId={trackId} />}
        {showForm === 'audioReply' &&
          (loggedIn ? (
            <AudioResponseForm trackId={trackId} setShowForm={setShowForm} />
          ) : (
            <p
              style={{
                fontWeight: 'bold',
                fontSize: '2rem',
                textAlign: 'center',
              }}
            >
              sign in to contribute!
            </p>
          ))}
        {showForm === 'edit' && <TrackPostEdit />}
      </div>
    </div>
  );
};

export default TrackShow;

import AudioResponse from '../audioResponse/AudioResponse';
import TrackMasterDisplay from '../trackMasterDisplay/TrackMasterDisplay';
import './trackShow.css';
import CommentsContainer from '../commentsContainer/CommentsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTrack } from '../../store/trackPost';
import { useParams } from 'react-router-dom';
import AudioResponseForm from '../audioResponseForm/AudioResponseForm';

const TrackShow = () => {
  const dispatch = useDispatch();
  const { trackId } = useParams();
  const track = useSelector((state) => state.trackPosts[trackId]);
  console.log('IN TRACK SHOW', trackId);
  const [showForm, setShowForm] = useState(false);
  const audioResponses = track?.responses;

  useEffect(() => {
    dispatch(getTrack(trackId));
  }, [dispatch, trackId]);

  return (
    <div className="track-show-page">
      <div className="left-track-container">
        <TrackMasterDisplay track={track} />
        <div className="audio-responses-container">
          {audioResponses?.map((response) => (
            <AudioResponse response={response} key={response._id} />
          ))}
        </div>
      </div>
      <div className="track-right-container">
        <div className="track-right-header">
          {' '}
          <button className="comment-button" onClick={() => setShowForm(true)}>
            Create Audio Reply
          </button>
          <button className="comment-button" onClick={() => setShowForm(false)}>
            Create Comment
          </button>
        </div>
        {showForm ? (
          <AudioResponseForm trackId={trackId} setShowForm={setShowForm} />
        ) : (
          <CommentsContainer trackId={trackId} />
        )}
      </div>
    </div>
  );
};

export default TrackShow;

import AudioResponse from '../audioResponse/AudioResponse';
import TrackMasterDisplay from '../trackMasterDisplay/TrackMasterDisplay';
import './trackShow.css';
import CommentsContainer from '../commentsContainer/CommentsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTrack } from '../../store/trackPost';
import { useParams } from 'react-router-dom';

const TrackShow = () => {
  const dispatch = useDispatch();
  const { trackId } = useParams();
  const track = useSelector((state) => state.trackPosts[trackId]);

  if (track) console.log('YIKOOOOOO', track);

  useEffect(() => {
    dispatch(getTrack(trackId));
  }, [dispatch]);

  return (
    <div className="track-show-page">
      <div className="left-track-container">
        <TrackMasterDisplay track={track} />
        <div className="audio-responses-container">
          <AudioResponse src={'empty'} />
        </div>
      </div>
      <div className="track-right-container">
        <CommentsContainer />
      </div>
    </div>
  );
};

export default TrackShow;

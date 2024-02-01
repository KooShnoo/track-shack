import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTrack } from '../../store/trackPost';
import './TrackPostsIndexItem.css';


const TrackPostsIndexItem = ({track}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrack(track.id));
  }, [dispatch, track.id]);

  return (
    <div className='post-card-container'>
      <img id='album-img' src={track?.albumArtSrc} alt="album cover" />
      <div id='post-contents'>
        <h5>{track?.title}</h5>
        <p>{track?.subtitle}</p>
      </div>
      <Link to={`trackPosts/${track?.id}`} className='show-button'>
        <button>Go to Track</button>
      </Link>
    </div>
  );
};

export default TrackPostsIndexItem;
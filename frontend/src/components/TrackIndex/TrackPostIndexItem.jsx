import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTrack } from '../../store/trackPost';
import './TrackPostIndexItem.css';


const TrackPostsIndexItem = ({trackPost}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrack(trackPost.id));
  }, [dispatch, trackPost.id]);

  return (
    <div className='post-card-container'>
      <img id='album-img' src={trackPost?.albumArtSrc} alt="album cover" />
      <div id='post-contents'>
        <h5>{trackPost?.title}</h5>
        <p>{trackPost?.subtitle}</p>
      </div>
      <Link to={`trackPosts/${trackPost?.id}`} className='show-button'>
        <button>Go to Track</button>
      </Link>
    </div>
  );
};

export default TrackPostsIndexItem;
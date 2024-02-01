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
        <Link to={`trackPosts/${trackPost?.id}`} ><h1>{trackPost?.title}</h1></Link>
        <p>{trackPost?.subtitle}</p>
      </div>
      <Link to={`trackPosts/${trackPost?.id}`} >
        <button id='show-page-button'>Go to Project <i class="fa-solid fa-arrow-right-long"></i></button>
      </Link>
    </div>
  );
};

export default TrackPostsIndexItem;
import { Link } from 'react-router-dom';
import './TrackPostIndexItem.css';


const TrackPostsIndexItem = ({trackPost}) => {

  return (
    <div className='post-card-container'>
      <img id='album-img' src={trackPost?.albumArtSrc} alt="album cover" />
      <div id='post-contents'>
        <Link to={`trackPosts/${trackPost?._id}`} ><h1>{trackPost?.title}</h1></Link>
        <p>{trackPost?.subtitle}</p>
      </div>
      <div className='post-show-link'>
        <Link to={`trackPosts/${trackPost?._id}`} >
          <button id='show-page-button'></button>
        </Link>
      </div>
    </div>
  );
};


export default TrackPostsIndexItem;
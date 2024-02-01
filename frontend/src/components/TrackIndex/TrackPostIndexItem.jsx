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
      <Link to={`trackPosts/${trackPost?._id}`} >
        <button id='show-page-button'>Go to Project <i className="fa-solid fa-arrow-right-long"></i></button>
      </Link>
    </div>
  );
};

export default TrackPostsIndexItem;
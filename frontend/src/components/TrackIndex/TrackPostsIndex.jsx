import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostsArray, getTracks } from '../../store/trackPost';
import TrackPostsIndexItem from './TrackPostIndexItem';
import './TrackPostsIndex.css';

const TrackPostsIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTracks());
  }, [dispatch]);

  const trackPosts = useSelector(selectPostsArray);

  const trackPostsList = trackPosts.map((trackPost) => 
    <TrackPostsIndexItem key={trackPost._id} trackPost={trackPost} />
);

  return (
    <div className="display-posts-container">
      <ul id="posts">
        {trackPostsList}
      </ul>
    </div>
  );
};


export default TrackPostsIndex;
import Comment from '../comment/Comment';
import './commentsContainer.css';
import CreateComment from '../createComment/CreateComment';
import { useSelector } from 'react-redux';

const CommentsContainer = ({trackId}) => {

  // const track = useSelector(state => state.trackPosts[trackId])
  const comments = useSelector(state => state.trackPosts[trackId]?.comments)

  return (
    <div className="commentsContainer">
      <CreateComment />
      <Comment comments={comments} />
    </div>
  );
};

export default CommentsContainer;

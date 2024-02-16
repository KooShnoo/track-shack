import Comment from '../comment/Comment';
import './commentsContainer.css';
import CreateComment from '../createComment/CreateComment';
import { useSelector } from 'react-redux';

const CommentsContainer = ({ trackId }) => {
  const loggedIn = useSelector((state) => !!state.session.user);
  const comments = useSelector((state) => state.trackPosts[trackId]?.comments);

  return (
    <div className="commentsContainer">
      {loggedIn ? (
        <div className="create">
          <CreateComment />
          <div className="comments-scroll logged-in">
            <Comment comments={comments} />
          </div>
        </div>
      ) : (
        <div className="comments-logged-out">
          <div className="create">
            <CreateComment />
          </div>
          <div className="comments-scroll logged-in">
            <Comment comments={comments} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsContainer;

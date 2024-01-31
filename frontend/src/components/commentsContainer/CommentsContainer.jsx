import Comment from '../comment/Comment';
import './commentsContainer.css';
import CreateComment from '../createComment/CreateComment';

const CommentsContainer = () => {
  return (
    <div className="commentsContainer">
      <CreateComment />
      <Comment />
    </div>
  );
};

export default CommentsContainer;

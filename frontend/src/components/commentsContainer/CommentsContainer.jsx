import Comment from '../comment/Comment';
import './commentsContainer.css';
import CreateComment from '../createComment/CreateComment';
import { useSelector } from 'react-redux';

const CommentsContainer = ({trackId}) => {
  const loggedIn = useSelector((state) => !!state.session.user)

  // const track = useSelector(state => state.trackPosts[trackId])
  const comments = useSelector(state => state.trackPosts[trackId]?.comments)

  return (
    <div className="commentsContainer">
      {loggedIn ? <CreateComment /> : <p style={{fontWeight: 'bold', fontSize: '2rem', textAlign: 'center'}}>sign in to comment!</p>}
      <Comment comments={comments} />
    </div>
  );
};

export default CommentsContainer;

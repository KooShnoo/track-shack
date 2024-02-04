import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteComment } from '../../../store/comment';
import { useDispatch } from 'react-redux';

const CommentThread = ({ id, author, timeAgo, content }) => {
  const currentUser = useSelector((state) => state.session.user);
  const { trackId } = useParams();
  const dispatch = useDispatch();

  return (
    <details open className="comment" id={id}>
      <a href={`#${id}`} className="comment-border-link">
        <span className="sr-only">{`Jump to ${id}`}</span>
      </a>
      <summary>
        <div className="comment-heading">
          <div className="comment-info">
            <a href="#">{author?.username}</a>
            <p>{`${timeAgo}`}</p>
          </div>
        </div>
      </summary>

      {currentUser?._id === author?._id && (
        <p
          className="delete"
          onClick={() => {
            dispatch(deleteComment(id, trackId));
          }}
        >
        </p>
      )}

      <div className="comment-body">
        <p>{content}</p>
        <div className="comment-body-buttons">
          <button
            className="reply-button"
            type="button"
            onClick={() => {
              console.log('HIHIHIHIH');
              dispatch(deleteComment(id, trackId));
            }}
          >
            Reply
          </button>
          {currentUser?._id === author?._id && (
            <button className="delete-button" type="button">
              Delete
            </button>
          )}
        </div>
      </div>
      {/* Add nested CommentThread components for replies if needed */}
    </details>
  );
};

export default CommentThread;

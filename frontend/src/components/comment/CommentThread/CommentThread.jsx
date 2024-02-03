import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteComment } from "../../../store/comment";
import { useDispatch } from "react-redux";

const CommentThread = ({ id, author, timeAgo, content }) => {
  const currentUser = useSelector((state) => state.session.user);
  const params = useParams();
  const dispatch = useDispatch()
  console.log(params);

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
          onClick={()=> {
            console.log("HIHIHIHIH");
            dispatch(deleteComment(id, params.trackId));
          }}
        >
          DELETE
        </p>
      )}

      <div className="comment-body">
        <p>{content}</p>
        <button className="reply-button" type="button">
          Reply
        </button>
      </div>
      {/* Add nested CommentThread components for replies if needed */}
    </details>
  );
};

export default CommentThread;

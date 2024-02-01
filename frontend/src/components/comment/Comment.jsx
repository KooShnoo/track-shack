import "./comment.css";
import CommentThread from "./CommentThread/CommentThread";

const Comment = ({ comments }) => {
  return (
    <div className="comment-thread">
      {comments?.map((comment) => {
          return <CommentThread
            id={comment?._id}
            author={comment?.author?.username}
            key={comment?._id}
            timeAgo={comment?.createdAt}
            content={comment?.body}
          />
      })}
    </div>
  );
};

export default Comment;

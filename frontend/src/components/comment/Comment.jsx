import "./comment.css";
import CommentThread from "./CommentThread/CommentThread";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const Comment = ({ comments }) => {
  return (
    <div className="comment-thread">
      {comments?.map((comment) => {
        return (
          <CommentThread
            id={comment?._id}
            author={comment?.author}
            key={comment?._id}
            timeAgo={dayjs(comment?.createdAt).fromNow()}
            content={comment?.body}
          />
        );
      })}
    </div>
  );
};

export default Comment;

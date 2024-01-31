const CommentThread = ({ id, author, timeAgo, content }) => {
  return (
    <details open className="comment" id={id}>
      <a href={`#${id}`} className="comment-border-link">
        <span className="sr-only">{`Jump to ${id}`}</span>
      </a>
      <summary>
        <div className="comment-heading">
          <div className="comment-info">
            <a href="#">{author}</a>
            <p>{`${timeAgo}`}</p>
          </div>
        </div>
      </summary>

      <div className="comment-body">
        <p>{content}</p>
        <button type="button">Reply</button>
      </div>
      {/* Add nested CommentThread components for replies if needed */}
    </details>
  );
};

export default CommentThread;

import './comment.css';
import CommentThread from './CommentThread/CommentThread';

const Comment = () => {
  return (
    <div className="commentContainer">
      <div className="comment-thread">
        <CommentThread
          id="comment-one"
          author="commentor one"
          timeAgo="4 days ago"
          content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore ab eos minus delectus iusto aut nihil voluptatum, aliquam illo pariatur officia ipsum. Vel, eius veritatis quidem sit sed voluptas et!"
        />
        <CommentThread
          id="comment-two"
          author="jiggbly two"
          timeAgo="4 days ago"
          content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore ab eos minus delectus iusto aut nihil voluptatum, aliquam illo pariatur officia ipsum. Vel, eius veritatis quidem sit sed voluptas et!"
        />
        <CommentThread
          id="comment-three"
          author="stumpleton three"
          timeAgo="4 days ago"
          content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore ab eos minus delectus iusto aut nihil voluptatum, aliquam illo pariatur officia ipsum. Vel, eius veritatis quidem sit sed voluptas et!"
        />
      </div>
    </div>
  );
};

export default Comment;

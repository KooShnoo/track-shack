import Comment from "../comment/Comment"
import './commentsContainer.css'

const CommentsContainer = () => {



    return (
      <div className="commentsContainer">
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
    );
}

export default CommentsContainer
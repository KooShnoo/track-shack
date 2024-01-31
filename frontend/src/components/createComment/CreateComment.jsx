import './createComment.css';

const CreateComment = () => {
  return (
    <div className="createCommentContainer">
      <div className="create-text">
        <textarea
          className="comment-text"
          name=""
          id=""
          cols="60"
          rows="10"
          placeholder="throw a lil comment"
        ></textarea>
        <div className="button-container">
          <button>Comment!</button>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;

import "./createComment.css";

const CreateComment = ({setShowModal}) => {

    

  return (
    <div className="createCommentContainer">
      <div className="create-text">
        <div className="create-new-container">
          <h1>Create a new comment</h1>
        </div>
      </div>
      <textarea
        className="comment-text"
        name=""
        id=""
        cols="60"
        rows="10"
      ></textarea>
      <div className="publish-container">
        <div className="publish-button">
          <h1 className="publish">Publish</h1>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;

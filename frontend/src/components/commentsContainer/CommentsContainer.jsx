import { useState } from "react";
import Comment from "../comment/Comment";
import "./commentsContainer.css";
import CreateComment from "../createComment/CreateComment";
const CommentsContainer = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="commentsContainer">
      <div className="show-modal-container">
        <div className="create-button-container">
          <h1>Create new comment</h1>
        </div>
      </div>
      {showModal && <CreateComment setShowModal={setShowModal} />}
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};

export default CommentsContainer;

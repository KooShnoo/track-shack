import { useDispatch, useSelector } from 'react-redux';
import './createComment.css';
// import { useEffect } from 'react';
import { createComment } from '../../store/comment';
import { useState } from 'react';

const CreateComment = () => {
  const dispatch = useDispatch();
  const [body, setBody] = useState('');
  const trackPosts = useSelector((state) => state.trackPosts);

  const handleSubmit = async () => {
    if (trackPosts) {
      const trackId = Object.keys(trackPosts)[0];
      dispatch(createComment({ body: body }, trackId));
      setBody('');
    }
  };

  return (
    <div className="createCommentContainer">
      <div className="create-text">
        <textarea
          className="comment-text"
          name=""
          id=""
          cols="60"
          rows="10"
          placeholder=""
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <div className="button-container">
          <button className="comment-button" onClick={handleSubmit}>
            Comment!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;

import Comment from "../comment/Comment";
import "./commentsContainer.css";
import CreateComment from "../createComment/CreateComment";
import { useSelector } from "react-redux";

const CommentsContainer = ({ trackId }) => {
  const loggedIn = useSelector((state) => !!state.session.user);

  // const track = useSelector(state => state.trackPosts[trackId])
  const comments = useSelector((state) => state.trackPosts[trackId]?.comments);

  return (
    <div className="commentsContainer">
      <div className="create">
        {loggedIn ? (
          <CreateComment />
        ) : (
          <p
            style={{
              fontWeight: "bold",
              fontSize: "2rem",
              textAlign: "center",
            }}
          >
            sign in to comment!
          </p>
        )}
      </div>
      <div className="comments-scroll logged-in">
        <Comment comments={comments} />
      </div>
    </div>
  );
};

export default CommentsContainer;

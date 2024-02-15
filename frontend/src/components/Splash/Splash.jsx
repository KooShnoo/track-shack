import { useEffect, useState } from "react";
import TrackPostCreate from "../TrackPostCreate/TrackPostCreate";
import TrackPostsIndex from "../TrackIndex/TrackPostsIndex";
import "./Splash.css";
import { useDispatch, useSelector } from "react-redux";
import { getTracks } from "../../store/trackPost";

const SplashPage = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();

  const handleCreateForm = () => {
    setToggleForm(!toggleForm);
  };

  const handleCloseForm = () => {
    setToggleForm(false);
  };

  useEffect(() => {
    dispatch(getTracks());
  }, [dispatch]);

  return (
    <div className="splash-base">
      <div className="splash-container">
        <div className={`left-container ${toggleForm ? "centered" : ""}`}>
          <div className="header">
            <div className="hell">
              <div className="welcome-container">
                <h1>Welcome to the Track Shack!</h1>
              </div>
              <div className="description">
                <p>What is there to do at Track Shack? Please peruse our user&apos;s music projects to see if you can add anything to any of them! Or create a project of your own and begin collaborating with other musicians! </p>
              </div>
            </div>
            <div className="user-options-container">
              <div>
                {loggedIn ? (
                  <button id="create-form-button" onClick={handleCreateForm}>
                    Post a Track
                  </button>
                ) : (
                  <button
                    id="create-form-button"
                    disabled
                    style={{ pointerEvents: "none" }}
                  >
                    Log In to Post a Track
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* <form id="search-container" action=""  */}
          {/* <input
              id="search-bar"
              placeholder="Search for genres or instruments"
            ></input>
            <button id="search-button" type="submit">
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ color: '#dadde2' }}
              ></i>
            </button> */}
          {/* </form> */}

          <div className="feed-container">{<TrackPostsIndex />}</div>
        </div>
        {toggleForm && (
          <div className="right-container">
            <TrackPostCreate onClose={handleCloseForm} />
          </div>
        )}
      </div>
      <div className="spacer"></div>
    </div>
  );
};

export default SplashPage;

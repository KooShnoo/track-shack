import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./ProfileShow.css";
import { getUserTracks } from "../../store/trackPost";
import TrackPostsIndexItem from "../TrackIndex/TrackPostIndexItem";
import { uploadPfp } from "../../store/userProfile";
import { getUser, updateUser } from "../../store/userProfile";

const ProfileShow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const tracks = useSelector((state) => state.trackPosts);
  const currentUser = useSelector((state) => state.session.user) || null;
  const user = useSelector((state) => state.userProfile);


  // const [newPassword, setNewPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState("");
  const [savePicture, setShowSavePicture] = useState(false)

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (userId) {
      dispatch(getUserTracks(userId));
      dispatch(getUser(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    setUsername(user?.username);
    setBio(user?.bio);
  }, [user]);

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
    setShowSavePicture(true)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (profilePicture) {
      await uploadPfp(profilePicture);
    }
    dispatch(updateUser({ bio, username }, userId));
    setProfilePicture(null);
    setEditingField(null);
  };

  return (
    <div className="profile-base">
      <div className="profile-main-page">
        <div className="profile-info-container">
          <div id="profile-picture" className="profile-image-container">
            <img
              src={user?.pfpSrc || "/profileImage/default.avif"}
              alt="profile picture"
            />
            {userId === currentUser?._id && (
              <label className="upload-option">
                <i className="fa-solid fa-upload"></i>
                <input
                  className="image"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </label>
            )}
            {savePicture && (
              <button id="image-save-button" onClick={handleSubmit}>
                Save
              </button>
            )}
          </div>
          <div id="profile-info">
            <div id="profile-username">
              {editingField === "username" ? (
                <div className="profile-edit-field">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <button id="save-button" onClick={handleSubmit}>
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <h1>{user?.username}</h1>
                  {userId === currentUser?._id && (
                    <button
                      id="edit-info-button"
                      onClick={() => setEditingField("username")}
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                  )}
                </>
              )}
            </div>
            <div id="profile-bio">
              {editingField === "bio" ? (
                <div className="profile-edit-field">
                  <textarea
                    placeholder="Tell us about you!..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                  <button id="save-button" onClick={handleSubmit}>
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  {user?.bio}
                  {userId === currentUser?._id && (
                    <button
                      id="edit-info-button"
                      onClick={() => setEditingField("bio")}
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <h1 id="my-tracks">MYtracks</h1>
        <div className="user-tracks-container">
          <div id="profile-track-list">
            {Array.isArray(tracks) &&
              tracks.map((trackPost) => (
                <TrackPostsIndexItem
                  key={trackPost?._id}
                  trackPost={trackPost}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileShow;

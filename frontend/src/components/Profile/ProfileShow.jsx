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
  // let user = tracks[0]?.author;
  const user = useSelector((state) => state.userProfile);
  // if(user) console.log(user);

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [username, setUsername] = useState("");
  // const [newPassword, setNewPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (profilePicture) {
      await uploadPfp(profilePicture);
    }
    dispatch(updateUser({ bio, username }, userId));
    setProfilePicture(null);
    setShowEditProfile(false);
  };

  return (
    <div className="profile-main-page">
      <div className="profile-info-container">
        <div id="profile-picture">
          <img
            src={user?.pfpSrc || "../../../public/profileImage/default.avif"}
            alt="profile picture"
          />
        </div>
        <div id="profile-info">
          <h1>{user?.username}</h1>
          {/* <p>{user?.email}</p> */}
          <p id="profile-bio">{user?.bio}</p>
          <button id="edit-info-button"onClick={() => setShowEditProfile(!showEditProfile)}>
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
        </div>
        <div>
          {showEditProfile && (
            <div className="edit-info-form-container">
              <button id="close-edit-form"type="submit" onClick={() => setShowEditProfile(false)}>
                <i className="fa-regular fa-circle-xmark"></i>
              </button>
              <form className="edit-profile-info">
                <p>New Username</p>
                <br />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <p>Bio</p>
                <br />
                <textarea
                  placeholder="Tell us about you!..."
                  id="bio-field"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <br />
                <p>Upload Profile Picture</p>
                <br />
                <input
                  type="file"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                />
                <br />
                {/* <input type="password" placeholder="Change Password" onChange={(e) => (setNewPassword(e.target.value) && setPasswordsMatch(e.target.value === confirmPassword))}/>
              <input type="password" placeholder="Confirm New Password" onChange={(e) =>(setConfirmPassword(e.target.value) && setPasswordsMatch(e.target.value === newPassword))}/> */}
                <button id="edit-user-submit"type="submit" onClick={handleSubmit}>
                  Update Info
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <h1 id="my-tracks">MYtracks</h1>
      <div className="user-tracks-container">
        <div id="profile-track-item">
          {Array.isArray(tracks) &&
            tracks.map((trackPost) => (
              <TrackPostsIndexItem key={trackPost?.id} trackPost={trackPost} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileShow;

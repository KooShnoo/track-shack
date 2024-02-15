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
            src={user?.pfpSrc || "/profileImage/default.avif"}
            alt="profile picture"
          />
        </div>
        <div id="profile-info">
          <h1>{user?.username}</h1>
          {/* <p>{user?.email}</p> */}
          <p>{user?.bio}</p>
          <button onClick={() => setShowEditProfile(!showEditProfile)}>
            Edit Info
          </button>
        </div>
      </div>
      <h1>My Tracks</h1>
      <div className="user-tracks-container">
        <div id="profile-track-item">
          {Array.isArray(tracks) &&
            tracks.map((trackPost) => (
              <TrackPostsIndexItem key={trackPost?.id} trackPost={trackPost} />
            ))}
        </div>
      </div>
      {showEditProfile && (
        <div className="edit-info-form-container">
          <button type="submit" onClick={() => setShowEditProfile(false)}>
            Close
          </button>
          <form className="edit-profile-info">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <textarea
              placeholder="Tell us about you!..."
              id="bio-field"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
            <input
              type="file"
              onChange={(e) => setProfilePicture(e.target.files[0])}
            />
            {/* <input type="password" placeholder="Change Password" onChange={(e) => (setNewPassword(e.target.value) && setPasswordsMatch(e.target.value === confirmPassword))}/>
          <input type="password" placeholder="Confirm New Password" onChange={(e) =>(setConfirmPassword(e.target.value) && setPasswordsMatch(e.target.value === newPassword))}/> */}
            <button type="submit" onClick={handleSubmit}>
              Update Info
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileShow;

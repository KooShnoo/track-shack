import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./ProfileShow.css";
import { getUserTracks } from "../../store/trackPost";

const ProfileShow = () => {

  const dispatch = useDispatch();
  const { userId } = useParams();
  const tracks = useSelector(state => state.trackPosts);

  let user;
  for (let key in tracks) {
    user = tracks[key].author;
    break;
  }

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [username, setUsername] = useState('user.username');
  const [profileEmail, setProfileEmail] = useState('user.email');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState('');
  
  useEffect(() => {
    if ( userId ) {
      dispatch(getUserTracks(userId));
    }
  }, [userId, dispatch]);

  // useEffect(() => {
  //   if ( userId ) {
  //     dispatch(fetchUserComments(userId, comments));
  //   }
  // }, [userId, comments, dispatch]);

  return (
    <>
      <div className="profile-main-page">
        <div className="profile-info-container">
          <div id="profile-picture"><i className="fa-solid fa-compact-disc fa-spin"></i></div>
          <div id="profile-info">
            <h1>{user?.username}</h1>
            <p>{user?.email}</p>
            <p>{bio}</p> 
          </div>
          <button onClick={() => setShowEditProfile(!showEditProfile)}>Edit Info</button>
        </div>
        {showEditProfile && 
        <div className="edit-info-form-container">
          <button type="submit" onClick={setShowEditProfile(false)}>Close</button>
          <form className="edit-profile-info">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder="Email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} />
            <textarea placeholder="Tell us about you!..." id="bio-field" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
            <input type="password" placeholder="Change Password" onChange={(e) => (setNewPassword(e.target.value) && setPasswordsMatch(e.target.value === confirmPassword))}/>
            <input type="password" placeholder="Confirm New Password" onChange={(e) =>(setConfirmPassword(e.target.value) && setPasswordsMatch(e.target.value === newPassword))}/>
            <button type="submit">Update Info</button>
          </form>
        </div>
        }
      </div>
    </>
  );
};

export default ProfileShow;
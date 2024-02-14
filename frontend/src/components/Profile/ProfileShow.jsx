import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./ProfileShow.css";
import { getUserTracks } from "../../store/trackPost";
import TrackPostsIndexItem from "../TrackIndex/TrackPostIndexItem";

const ProfileShow = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const tracks = useSelector(state => state.trackPosts);
  const currentUser = useSelector(state => state.session.user) || null;
  let user = tracks[0]?.author;
  // if(user) console.log(user);

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [username, setUsername] = useState('user.username');
  const [profileEmail, setProfileEmail] = useState('user.email');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  
  const [profilePicture, setProfilePicture] = useState('user.image');
  const [bio, setBio] = useState('');
  
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  },[currentUser, navigate]);

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

  const handleSubmit = (e) => {
    e.preventDefault; 

    if (newPassword !== confirmPassword) {
      setPasswordsMatch(false);
      return 'Password fields must match';
    } else {
      setPasswordsMatch(true);
    }
  };

  return (
    <div className="profile-main-page">
      <div className="profile-info-container">
        <div id="profile-picture">
          <img src={user?.image || '../../../public/profileImage/default.avif'} alt="profile picture" />
        </div>
        <div id="profile-info">
          <h1>{user?.username}</h1> 
          {/* <p>{user?.email}</p> */}
          <p>{bio}</p> 
          <button onClick={() => setShowEditProfile(!showEditProfile)}>Edit Info</button>
        </div>
      </div>
      <h1>My Tracks</h1>
      <div className="user-tracks-container">
        <div id="profile-track-item">
          {Array.isArray(tracks) && tracks.map(trackPost => (
            <TrackPostsIndexItem key={trackPost?.id} trackPost={trackPost} />
          ))}
        </div>
      </div>
      {showEditProfile && 
      <div className="edit-info-form-container">
        <button type="submit" onClick={() => setShowEditProfile(false)}>Close</button>
        <form className="edit-profile-info">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="text" placeholder="Email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} />
          <textarea placeholder="Tell us about you!..." id="bio-field" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
          <input type="password" placeholder="Change Password" onChange={(e) => (setNewPassword(e.target.value) && setPasswordsMatch(e.target.value === confirmPassword))}/>
          <input type="password" placeholder="Confirm New Password" onChange={(e) =>(setConfirmPassword(e.target.value) && setPasswordsMatch(e.target.value === newPassword))}/>
          <button type="submit" onClick={handleSubmit}>Update Info</button>
        </form>
      </div>
      }
    </div>
  );
};

export default ProfileShow;
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';

function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const navigate = useNavigate()

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const navToProfile = () => {
    navigate(`/profile/${user?._id}`)
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <button className="logout-button" onClick={logoutUser}>
            Logout
          </button>
          <button className="profile-button" onClick={navToProfile}>
            MyShack
          </button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link id="about-button" to={'/about'}>
            About
          </Link>
          <Link id="signup-button" to={'/signup'}>
            Signup
          </Link>
          <Link id="login-button" to={'/login'}>
            Login
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="nav-bar">
      <Link id="logo" to={'/'}>
        <i className="fa-solid fa-compact-disc fa-spin"></i>TRACKshack
      </Link>
      {getLinks()}
    </div>
  );
}

export default NavBar;

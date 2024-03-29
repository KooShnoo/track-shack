import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';

function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links">
          <Link id="about-button" to={'/about'}>
            About Us
          </Link>
          <Link id="home-button" to={'/'}>
            Home
          </Link>
          <Link id="profile-button" to={`/profile/${user?._id}`}>
            MyShack
          </Link>
          <button id="logout-button" onClick={logoutUser}>
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div className="links">
          <Link id="about-button" to={'/about'}>
            About Us
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

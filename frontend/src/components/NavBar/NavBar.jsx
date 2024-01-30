import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';

function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
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
    <di className="nav-bar">
      <Link id="logo" to={'/'}>
        <i className="fa-solid fa-compact-disc fa-spin"></i>TRACKshack
      </Link>
      {getLinks()}
    </di>
  );
}

export default NavBar;

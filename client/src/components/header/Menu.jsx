import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Avatar from '../Avatar';
import { logout } from '../../redux/actions/authAction';
import { TYPES } from '../../redux/actions/_types';

const Menu = () => {
  const navLinks = [
    { label: 'Home', icon: 'home', path: '/' },
    { label: 'Message', icon: 'near_me', path: '/message' },
    { label: 'Discover', icon: 'explore', path: '/discover' },
    { label: 'Notify', icon: 'favorite', path: '/notify' },
  ];

  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const isActive = (pn) => {
    if (pn === pathname) return 'active';
  };
  return (
    <div className="menu">
      <ul className="navbar-nav flex-row">
        {navLinks.map((link, index) => (
          <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
            <Link className="nav-link" to={link.path}>
              <span className="material-icons">{link.icon}</span>
            </Link>
          </li>
        ))}

        <li className="nav-item dropdown mx-2" style={{ opacity: 1 }}>
          <span
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Avatar
              auth={auth}
              theme={theme}
              src={auth.user.avatar}
              size="medium-avatar"
            />
          </span>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
                Profile
              </Link>
            </li>
            <li>
              <label
                htmlFor="theme"
                className="dropdown-item"
                onClick={() => dispatch({ type: TYPES.THEME, payload: !theme })}
              >
                {theme ? 'Light mode' : 'Dark mode'}
              </label>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link
                className="dropdown-item"
                to="/"
                onClick={() => dispatch(logout())}
              >
                Logout
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Menu;

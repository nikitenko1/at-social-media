import { Link } from 'react-router-dom';
import Menu from './Menu';
import Search from './Search';

const Header = () => {
  return (
    <div className="header bg-light">
      <nav
        className="navbar navbar-expand-lg navbar-light 
            justify-content-between align-middle"
      >
        <Link href="/" className="logo mx-2">
          <h2 className="navbar-brand">Social Media</h2>
        </Link>
        <Search />
        <Menu />
      </nav>
    </div>
  );
};

export default Header;

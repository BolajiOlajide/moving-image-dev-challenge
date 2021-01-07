import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import getLinkClass from '../utils/get-link-class';


const Header: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <header>
      <h1 className="mainTitle">Videos</h1>

      <nav>
        <ul>
          <li className={getLinkClass('/', pathname)}>
            <Link to="/">Home</Link>
          </li>

          <li className={getLinkClass('/about', pathname)}>
            <Link  to="/about">About</Link>
          </li>

          <li className={getLinkClass('/faq', pathname)}>
            <Link  to="/faq">FAQ</Link>
          </li>
        </ul>
      </nav>

      <Link to="/add-video" className="add-video">Add Video</Link>
    </header>
  )
};

export default Header;
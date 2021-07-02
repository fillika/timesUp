import React, { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();

  const logOut = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    localStorage.removeItem('JWT');
    dispatch({ type: 'APP_LOG_OUT' });
  };

  return (
    <aside className='sidebar'>
      <p className="sidebar__title">Track</p>
      <ul>
        <li>Timer</li>
      </ul>
      <p className="sidebar__title">Statictis</p>
      <ul>
        <li>Reports</li>
      </ul>
      <p className="sidebar__title">Menu</p>
      <ul>
        <li>News</li>
        <li>Profile</li>
      </ul>

      <a className="sidebar__log-out" href='#' onClick={logOut}>
        Log out
      </a>
    </aside>
  );
};

export default Sidebar;

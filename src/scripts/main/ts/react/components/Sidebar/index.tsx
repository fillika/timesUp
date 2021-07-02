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
      <p>Track</p>
      <ul>
        <li>Timer</li>
      </ul>
      <p>Statictis</p>
      <ul>
        <li>Reports</li>
      </ul>
      <p>Menu</p>
      <ul>
        <li>Profile</li>
      </ul>

      <a href='#' onClick={logOut}>
        Log out
      </a>
    </aside>
  );
};

export default Sidebar;

import React, { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createNotify } from 'Utils/helpers/createNotify';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();

  const logOut = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    dispatch({ type: 'APP_LOG_OUT' });
    dispatch({ type: 'SET_DEFAULT_ACTIVE_TASK_PROPS' });
  };

  return (
    <aside className='sidebar'>
      <p className='sidebar__title'>Track</p>
      <ul>
        <li>
          <NavLink exact to='/'>
            Timer
          </NavLink>
        </li>
      </ul>
      <p className='sidebar__title'>Statictis</p>
      <ul>
        <li>
          <NavLink to='/reports'>Reports</NavLink>
        </li>
      </ul>
      <p className='sidebar__title'>Menu</p>
      <ul>
        <li>
          <NavLink to='/news'>News</NavLink>
        </li>
        <li>
          <NavLink to='/profile'>Profile</NavLink>
        </li>
      </ul>
      <p className='sidebar__title'>DevTools</p>
      <ul>
        <li onClick={() => createNotify('error', 'Test ERROR', dispatch, 5000)}>Call notification</li>
      </ul>

      <a className='sidebar__log-out' href='#' onClick={logOut}>
        Log out
      </a>
    </aside>
  );
};

export default Sidebar;

import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createNotify } from 'Utils/helpers/createNotify';
import { IconButton } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    exitButton: {
      borderColor: theme.palette.error.main,
      color: theme.palette.error.main,
      border: '2px solid',
      width: 50,
      height: 50,
      position: 'absolute',
      bottom: 50,
      left: 10,
    },
    title: {
      color: 'silver',
      fontSize: 'small',
      marginBottom: '1em',
      marginTop: '1em',
    },
  })
);

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const logOut = () => {
    dispatch({ type: 'APP_LOG_OUT' });
    dispatch({ type: 'SET_DEFAULT_ACTIVE_TASK_PROPS' });
  };

  return (
    <aside className='sidebar'>
      <p className={classes.title}>Track</p>
      <ul>
        <li>
          <NavLink exact to='/'>
            Timer
          </NavLink>
        </li>
      </ul>
      <p className={classes.title}>Statictis</p>
      <ul>
        <li>
          <NavLink to='/reports'>Reports</NavLink>
        </li>
      </ul>
      <p className={classes.title}>Menu</p>
      <ul>
        <li>
          <NavLink to='/news'>News</NavLink>
        </li>
        <li>
          <NavLink to='/profile'>Profile</NavLink>
        </li>
      </ul>
      <p className={classes.title}>DevTools</p>
      <ul>
        <li onClick={() => createNotify('error', 'Test ERROR', dispatch, 5000)}>Call notification</li>
      </ul>

      <IconButton onClick={logOut} className={classes.exitButton} title='Exit'>
        <ExitToApp />
      </IconButton>
    </aside>
  );
};

export default Sidebar;

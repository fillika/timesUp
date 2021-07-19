import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNotify } from 'Utils/helpers/createNotify';
import IconButton from '@material-ui/core/IconButton';
import ExitToApp from '@material-ui/icons/ExitToApp';
import TimerIcon from '@material-ui/icons/Timer';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CodeIcon from '@material-ui/icons/Code';
import { useStyles } from './hooks/useStyles';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const logOut = () => {
    dispatch({ type: 'APP_LOG_OUT' });
    dispatch({ type: 'SET_DEFAULT_ACTIVE_TASK_PROPS' });
  };

  return (
    <aside className='sidebar'>
      <p className={classes.title}>Track</p>
      <ul>
        <li>
          <IconButton onClick={() => history.push('/')} className={classes.iconLink} color='primary' title='Timer'>
            <TimerIcon fontSize='large' />
          </IconButton>
        </li>
      </ul>

      <p className={classes.title}>Statictis</p>
      <ul>
        <li>
          <IconButton
            onClick={() => history.push('/reports')}
            className={classes.iconLink}
            color='primary'
            title='Reports'>
            <AssessmentIcon fontSize='large' />
          </IconButton>
        </li>
      </ul>

      <p className={classes.title}>Menu</p>
      <ul>
        <li>
          <IconButton onClick={() => history.push('/news')} className={classes.iconLink} color='primary' title='News'>
            <AnnouncementIcon fontSize='large' />
          </IconButton>
        </li>
        <li>
          <IconButton
            onClick={() => history.push('/profile')}
            className={classes.iconLink}
            color='primary'
            title='Profile'>
            <AccountBoxIcon fontSize='large' />
          </IconButton>
        </li>
      </ul>

      <p className={classes.title}>DevTools</p>
      <ul>
        <li>
          <IconButton
            onClick={() => createNotify('error', 'Test ERROR', dispatch, 5000)}
            className={classes.iconLink}
            color='primary'
            title='Timer'>
            <CodeIcon fontSize='large' />
          </IconButton>
        </li>
      </ul>

      <IconButton onClick={logOut} className={classes.exitButton} title='Exit'>
        <ExitToApp fontSize='large' />
      </IconButton>
    </aside>
  );
};

export default Sidebar;

import React from 'react';
import { useHistory } from 'react-router-dom';

import { useStyles } from './hooks/useStyles';
import { usePresenter } from './hooks/usePresenter';

import IconButton from '@material-ui/core/IconButton';
import ExitToApp from '@material-ui/icons/ExitToApp';
import TimerIcon from '@material-ui/icons/Timer';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CodeIcon from '@material-ui/icons/Code';
import FormatListNumberedRoundedIcon from '@material-ui/icons/FormatListNumberedRounded';

const Sidebar: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [handleOpen, logOut, testErr] = usePresenter();

  return (
    <>
      <aside className={classes.root}>
        <p className={classes.title}>Track</p>
        <ul>
          <li>
            <IconButton
              onClick={() => history.push('/')}
              className={classes.iconLink}
              color='primary'
              title='Task list'>
              <FormatListNumberedRoundedIcon className={classes.icon} />
            </IconButton>
          </li>
          <li>
            <IconButton onClick={handleOpen} className={classes.iconLink} color='primary' title='Timer'>
              <TimerIcon className={classes.icon} />
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
              <AssessmentIcon className={classes.icon} />
            </IconButton>
          </li>
        </ul>

        <p className={classes.title}>Menu</p>
        <ul>
          <li>
            <IconButton onClick={() => history.push('/news')} className={classes.iconLink} color='primary' title='News'>
              <AnnouncementIcon className={classes.icon} />
            </IconButton>
          </li>
          <li>
            <IconButton
              onClick={() => history.push('/profile')}
              className={classes.iconLink}
              color='primary'
              title='Profile'>
              <AccountBoxIcon className={classes.icon} />
            </IconButton>
          </li>
        </ul>

        <p className={classes.title}>DevTools</p>
        <ul>
          <li>
            <IconButton onClick={testErr} className={classes.iconLink} color='primary' title='Timer'>
              <CodeIcon className={classes.icon} />
            </IconButton>
          </li>
        </ul>

        <IconButton onClick={logOut} className={classes.exitButton} title='Exit'>
          <ExitToApp className={classes.icon} />
        </IconButton>
      </aside>
    </>
  );
};

export default Sidebar;

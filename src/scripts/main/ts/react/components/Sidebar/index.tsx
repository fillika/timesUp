import React, { Dispatch } from 'react';
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
import FormatListNumberedRoundedIcon from '@material-ui/icons/FormatListNumberedRounded';
import { useStyles } from './hooks/useStyles';
import { ModalComponent } from 'App/components/Modal';
import styled from 'styled-components';

const StyledModal= styled.div`
  padding: 2em;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #282c35;
  width: 95%;
  max-width: 800px;
  position: absolute;
  left: 50%;
  top: 160px;
  transform: translatex(-50%);
`


const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const logOutHandler = () => (dispatch: Dispatch<{ type: string }>) => {
    dispatch({ type: 'APP_LOG_OUT' });
    dispatch({ type: 'SET_DEFAULT_ACTIVE_TASK_PROPS' });
  };

  const logOut = () => dispatch(logOutHandler());

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <aside className={classes.root}>
      <p className={classes.title}>Track</p>
      <ul>
        <li>
          <IconButton onClick={() => history.push('/')} className={classes.iconLink} color='primary' title='Task list'>
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
          <IconButton
            onClick={() => createNotify('error', 'Test ERROR', dispatch, 5000)}
            className={classes.iconLink}
            color='primary'
            title='Timer'>
            <CodeIcon className={classes.icon} />
          </IconButton>
        </li>
      </ul>

      <IconButton onClick={logOut} className={classes.exitButton} title='Exit'>
        <ExitToApp className={classes.icon} />
      </IconButton>

      <ModalComponent open={open} handleClose={handleClose}>
        <StyledModal>
          <h1>Some modal</h1>
          <p>Some content</p>
        </StyledModal>
      </ModalComponent>
    </aside>
  );
};

export default Sidebar;

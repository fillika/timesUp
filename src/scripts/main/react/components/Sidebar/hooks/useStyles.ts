import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: 5,
    borderRight: '1px solid',
    overflow: 'hidden',
    position: 'relative',
  },
  exitButton: {
    border: '2px solid',
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
    position: 'absolute',
    padding: 8,
    width: 50,
    height: 50,
    bottom: '4vh',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  iconLink: {
    padding: 8,
    width: '2.5em',
    height: '2.5em'
  },
  icon: {
    fontSize: '2em',
  },
  title: {
    color: 'silver',
    fontSize: 'small',
    marginBottom: 0,
    marginTop: '1em',
  },
}));

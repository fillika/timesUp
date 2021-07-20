import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    minWidth: '2em',
    width: '2em',
    height: '2em',
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  playIcon: {
    width: '1.5em',
    height: '1.5em',
  }
}));

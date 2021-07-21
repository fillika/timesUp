import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    width: 40,
    height: 40,
    padding: 0,
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
  },
  iconButtonActive: {
    borderColor: theme.palette.error.main,
  },
  playIcon: {
    color: theme.palette.secondary.main,
    fontSize: 36
  },
  stopIcon: {
    color: theme.palette.error.main,
    fontSize: 36
  },
}));
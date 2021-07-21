import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    width: 40,
    height: 40,
    padding: 0,
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
    [theme.breakpoints.up(1440)]: {
      width: 50,
      height: 50,
    },
    [theme.breakpoints.up(1600)]: {
      width: 55,
      height: 55,
    }
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
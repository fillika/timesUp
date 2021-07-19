import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  exitButton: {
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
    border: '2px solid',
    width: 50,
    height: 50,
    padding: 8,
    position: 'absolute',
    bottom: 50,
    left: 10,
  },
  iconLink: {
    width: 50,
    height: 50,
    padding: 8,
  },
  title: {
    color: 'silver',
    fontSize: 'small',
    marginBottom: 0,
    marginTop: '1em',
  },
}));

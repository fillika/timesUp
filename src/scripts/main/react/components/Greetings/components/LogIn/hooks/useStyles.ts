import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  button: {
    backgroundColor: theme.palette.success.main,
    color: '#FFF',
    '&:hover': {
      backgroundColor: theme.palette.success.light,
    },
  },
}));

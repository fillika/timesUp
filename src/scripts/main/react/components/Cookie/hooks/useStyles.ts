import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    right: 10,
    bottom: 20,
    backgroundColor: '#fff',
    width: 300,
    borderRadius: 10,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: 10,
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
  },
  wrapper: {
    marginTop: 10,
  },
}));

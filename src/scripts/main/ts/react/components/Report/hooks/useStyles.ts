import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    padding: 10,
    [theme.breakpoints.up('md')]: {
      padding: 20
    }
  },
}));
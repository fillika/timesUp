import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100vh',
  },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '64px 1fr',
    height: '100vh',
    overflow: 'hidden',
  },
}));

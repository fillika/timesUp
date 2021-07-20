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
  main: {
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: 4,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: 10,
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: theme.palette.primary.light,
      },
    },
  },
}));

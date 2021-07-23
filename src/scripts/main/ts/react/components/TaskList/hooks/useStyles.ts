import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100vh',
    fontSize: 16,
    [theme.breakpoints.up(1440)]: {
      fontSize: 20
    },
    [theme.breakpoints.up(1600)]: {
      fontSize: 22
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 24
    },
  },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'minmax(70px, 3em) 1fr',
    height: '100vh',
    overflow: 'hidden',
  },
  main: {
    overflowX: 'hidden',
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

import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    gridArea: 'header',
    position: 'sticky',
    borderBottom: '1px solid',
    borderColor: theme.palette.primary.main,
    display: 'flex',
    padding: 0,
    height: 60,
    top: 0,
    backgroundColor: '#fff',
    zIndex: theme.zIndex.appBar,
  },
  panel: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    height: '100%',
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: 'repeat(2, 1fr)',
    columnGap: 15,
    backgroundColor: '#fff',
    padding: '0 10px',
  },
  input: {
    width: '100%',
    height: '100%',
    border: 'none',
    fontSize: 16,
    padding: ' 0 20px',

    '&:focus': {
      outline: 'none',
    },
    '&:disabled': {
      color: 'gray',
      backgroundColor: '#fff',
    },
  },
  wrapper: {
    width: '100%',
    height: '100%',
  },
}));

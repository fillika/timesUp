import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'sticky',
    borderBottom: '1px solid',
    borderColor: theme.palette.primary.main,
    display: 'flex',
    padding: 0,
    height: '3.5em',
    top: 0,
    backgroundColor: '#fff',
    zIndex: theme.zIndex.appBar,
    overflow: 'hidden',
  },
  panel: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    height: '100%',
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr auto',
    columnGap: 15,
    backgroundColor: '#fff',
    padding: '0 10px',
  },
  input: {
    width: '100%',
    height: '100%',
    border: 'none',
    fontSize: '0.9em',
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

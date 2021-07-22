import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    padding: 10,
    paddingBottom: 0,
    [theme.breakpoints.up('md')]: {
      padding: 20,
      paddingBottom: 0,
    }
  },
  inputWrapper: {
    display: 'flex',
    marginBottom: 20,
  },
  searchInput: {
    width: '100%',
  },
  searchIcon: {
    minWidth: 50,
  },
  timeWrapper: {
    display: 'flex',
    width: '100%',
    maxWidth: 450,
    marginBottom: 20
  },
  timeIconWrapper: {
    display: 'flex',
    width: 30,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  timeSelect: {
    width: '100%'
  }
}));

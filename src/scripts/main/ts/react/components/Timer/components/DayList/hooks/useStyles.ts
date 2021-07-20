import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  taskSectionWrapper: {
    padding:'0 10px',
    display: 'flex',
    alignItems: 'center',
    height: 40,
    justifyContent: 'space-between',
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
  },
  taskSectionPanel: {
    display: 'flex',
    alignItems: 'center',
    height: 20,
  }, 
  totalTime: {
    fontSize: '0.8em',
    color: theme.palette.primary.main,
    marginRight: 20,
  },
  menu: {
    width: 20,
    height: 20,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 20,
    linHeight: '0.5em',
  },
  taskList: {
  },
}));

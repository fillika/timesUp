import { makeStyles, Theme } from '@material-ui/core/styles';



export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    right: 10,
    top: 0,
    zIndex: theme.zIndex.tooltip,
  },
  wrapper: {
    width: 320,
    paddingTop: 10,
    display: 'grid',
    gap: '0 5px',
  },
  item: {
    borderRadius: 6,
    fontSize: 16,
    paddingLeft: 20,
    paddingBottom: 8,
    paddingTop: 8,
    paddingRight: 15,
    marginBottom: 10,
    lineHeight: '120%',
    minHeight: 60,
    backgroundColor: theme.palette.primary.main,
    backgroundImage: 'linear-gradient(to right, silver 0% 100%)',
    backgroundSize: '10px 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left top',
    color: '#fff',
  },
  itemSuccess: {
    backgroundImage: `linear-gradient(to right, ${theme.palette.success.main} 0% 100%)`
  },
  itemWarning: {
    backgroundImage: `linear-gradient(to right, ${theme.palette.warning.main} 0% 100%)`
  },
  itemError: {
    backgroundImage: `linear-gradient(to right, ${theme.palette.error.main} 0% 100%)`
  },
}));

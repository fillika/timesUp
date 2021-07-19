import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

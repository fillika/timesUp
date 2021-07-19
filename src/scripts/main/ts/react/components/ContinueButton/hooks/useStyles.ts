import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

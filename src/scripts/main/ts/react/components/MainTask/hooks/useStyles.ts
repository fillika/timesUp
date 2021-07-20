import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ palette }: Theme) => ({
  task: {
    backgroundImage: `linear-gradient(${palette.primary.main}, ${palette.primary.main})`,
    backgroundSize: '100% 1px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center bottom',
    '&:hover': {
      backgroundColor: 'silver'
    }
  },
  taskParent: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  counter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${palette.secondary.main}`,
    width: 30,
    height: 30,
    minWidth: 30,
    minHeight: 30,
    borderRadius: '50%',
    marginRight: 10,
    cursor: 'pointer',
    userSelect: 'none',

    '&:active': {
      backgroundColor: 'gray',
    },
  },
  inputWRapper: {
    width: '100%',
  },
  input: {
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'inherit',
    width: '100%',
  },
}));

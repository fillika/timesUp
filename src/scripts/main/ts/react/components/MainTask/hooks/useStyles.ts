import { makeStyles, Theme } from '@material-ui/core/styles';

const bottomLine = (lineColor: string) => {
  return {
    backgroundImage: `linear-gradient(${lineColor}, ${lineColor})`,
    backgroundSize: '100% 1px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center bottom',
  };
};

const variables = {
  paddingLeft: 20,
  counterMarginRight: 10,
  counterSides: 30,
};

const inputStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  color: 'inherit',
  width: '100%',
}

export const useStyles = makeStyles(({ palette }: Theme) => ({
  task: {
    ...bottomLine(palette.primary.main),
  },
  taskParent: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: variables.paddingLeft,

    '&:hover': {
      backgroundColor: palette.grey[300],
    },
  },
  taskChild: {
    ...bottomLine(palette.grey[500]),
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: variables.counterMarginRight + variables.counterSides + variables.paddingLeft,
    '& input': inputStyle,
    '&:hover': {
      backgroundColor: palette.grey[100],
    },
  },
  counter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${palette.secondary.main}`,
    width: variables.counterSides,
    height: variables.counterSides,
    minWidth: variables.counterSides,
    minHeight: variables.counterSides,
    borderRadius: '50%',
    marginRight: variables.counterMarginRight,
    cursor: 'pointer',
    userSelect: 'none',

    '&:active': {
      backgroundColor: 'gray',
    },
  },
  inputWRapper: {
    width: '100%',
  },
  input: inputStyle,
}));

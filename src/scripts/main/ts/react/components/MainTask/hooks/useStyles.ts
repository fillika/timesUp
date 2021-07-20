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
  paddingLeft: 30,
  counterMarginRight: 10,
  counterSides: '2em',
};

const inputStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  color: 'inherit',
  width: '100%',
  fontSize: '0.9em',
};

export const useStyles = makeStyles(({ palette }: Theme) => ({
  task: {
    ...bottomLine(palette.primary.main),
  },
  taskParent: {
    display: 'flex',
    alignItems: 'center',
    height: '3.15em',
    paddingLeft: variables.paddingLeft,

    '&:hover': {
      backgroundColor: palette.grey[300],
    },
  },
  taskChild: {
    ...bottomLine(palette.grey[500]),
    display: 'flex',
    alignItems: 'center',
    height: '3.15em',
    paddingLeft: `calc(${variables.counterSides} + ${variables.counterMarginRight}px + ${variables.paddingLeft}px)`,
    backgroundColor: palette.grey[100],

    '& input': { ...inputStyle, fontSize: '0.8em' },
    '&:hover': {
      backgroundColor: palette.grey[300],
    },
  },
  taskPanel: {
    display: 'flex',
    alignItems: 'center',
    lineHeight: '1.25em',
    paddingRight: 15
  },
  timeTotal: {
    fontSize: '0.8em',
  },
  timeRange: {
    fontSize: '0.8em',
    marginRight: 10,
    padding: 5,
    borderRadius: 20,
    userSelect: 'none',

    '&:hover': {
      cursor: 'pointer',
      backgroundColor: palette.grey[400],
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

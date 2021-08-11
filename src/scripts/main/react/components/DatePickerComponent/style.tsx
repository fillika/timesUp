import styled from 'styled-components';
import { withTheme } from '@material-ui/styles';

export const StyledDatePickerWrapper = withTheme(styled('div')`
  width: 90%;
  position: absolute;
  left: 50%;
  top: 50px;
  transform: translateX(-50%);
  max-width: 286px;
  padding: 5px;
  border-radius: 4px;
  background-color: ${props => props.theme.palette.primary.main};

  .date-inputs-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 5px;

    label {
      color: #fff;

      &.Mui-focused {
        color: #6a5acd;
      }
    }

    input {
      color: #fff;

      :focus {
        color: #6a5acd;
      }
    }

    .date-picker-input {
      width: 48%;
    }

    .MuiFilledInput-root,
    .MuiFilledInput-root:hover {
      background-color: #fff;
    }
  }

  .date-picker-wrapper {
    margin-bottom: 0.3em;
  }

  .buttons-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    width: 2rem;
    line-height: 2rem;
    font-size: 1.25em;
  }
`);

import styled from 'styled-components';
import { withTheme } from '@material-ui/styles';

export const StyledDatePickerWrapper = withTheme(styled('div')`
  width: 90%;
  margin: 50px auto 0;
  max-width: 286px;
  padding: 5px;
  border-radius: 4px;
  background-color: ${props => props.theme.palette.primary.main};

  .date-inputs-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 5px;

    .date-picker-input {
      width: 48%;
    }

    .MuiFilledInput-root,
    .MuiFilledInput-root:hover {
      background-color: #fff;
    }
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    width: 2rem;
    line-height: 2rem;
    font-size: 1.25em;
  }
`);

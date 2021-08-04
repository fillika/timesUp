import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Button from '@material-ui/core/Button';

import { TimeInput } from './components/TimeInput';

import 'react-datepicker/dist/react-datepicker.css';
import { StyledDatePickerWrapper } from './style';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

export const datePickerTheme = createTheme({
  palette: {
    primary: {
      main: '#6a5acd',
    },
    secondary: {
      main: '#dc3545',
    },
  },
});

interface IDatePicker {
  start?: string;
  stop?: string;
  day?: Date;
  handleClose: () => void;
}

// https://github.com/Hacker0x01/react-datepicker/
export const DatePickerComponent: React.FC<IDatePicker> = props => {
  const { start, stop, day = new Date(), handleClose } = props;
  const [startDate, setStartDate] = useState(day);

  const sumbitHadler = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    console.log(startDate);
  };
  return (
    <StyledDatePickerWrapper>
      <ThemeProvider theme={datePickerTheme}>
        <form onSubmit={sumbitHadler}>
          <div className='date-inputs-wrapper'>
            <TimeInput className='date-picker-input' initTime={start} label={'Start'} />
            <TimeInput className='date-picker-input' initTime={stop} label={'Stop'} />
          </div>

          <div className='date-picker-wrapper'>
            <DatePicker inline={true} selected={startDate} onChange={(date: Date) => setStartDate(date)} />
          </div>

          <div className='buttons-wrapper'>
            <Button onClick={handleClose} color='secondary' variant='contained'>
              Закрыть
            </Button>
            <Button onClick={() => console.log('Data here')} color='primary' variant='contained' type='submit'>
              Изменить
            </Button>
          </div>
        </form>
      </ThemeProvider>
    </StyledDatePickerWrapper>
  );
};

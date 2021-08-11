import React, { useState, useRef } from 'react';
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

  const startInputRef = useRef(null);
  const stopInputRef = useRef(null);

  const sumbitHadler = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    // Спорное решение. Создал 2 рефа, которые прокинул в TimeInput. Записываю в них текущее значение даты
    const data = {
      start: startInputRef.current,
      stop: stopInputRef.current,
      startDate
    }
    console.log(data);
  };
  return (
    <StyledDatePickerWrapper>
      <ThemeProvider theme={datePickerTheme}>
        <form onSubmit={sumbitHadler}>
          <div className='date-inputs-wrapper'>
            <TimeInput className='date-picker-input' initTime={start} label={'Start'} reffer={startInputRef} />
            <TimeInput className='date-picker-input' initTime={stop} label={'Stop'} reffer={stopInputRef} />
          </div>

          <div className='date-picker-wrapper'>
            <DatePicker inline={true} selected={startDate} onChange={(date: Date) => setStartDate(date)} />
          </div>

          <div className='buttons-wrapper'>
            <Button onClick={handleClose} color='secondary' variant='contained'>
              Закрыть
            </Button>
            <Button color='primary' variant='contained' type='submit'>
              Изменить
            </Button>
          </div>
        </form>
      </ThemeProvider>
    </StyledDatePickerWrapper>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import Button from '@material-ui/core/Button';

import { TimeInput } from './components/TimeInput';
import { getHoursAndMinutes } from 'Utils/Date';

import 'react-datepicker/dist/react-datepicker.css';
import { StyledDatePickerWrapper } from './style';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { getResult } from './components/TimeInput/utils/getResult';

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

export type TDispatchDatePickerData = {
  _id: string;
  start: string;
  stop: string;
  duration: number;
};
interface IDatePicker {
  data: {
    _id: string;
    start: string;
    stop: string;
  };
  handleClose: () => void;
  sumbitHadler: (data: TDispatchDatePickerData) => void;
}

// https://github.com/Hacker0x01/react-datepicker/
export const DatePickerComponent: React.FC<IDatePicker> = props => {
  const { data, handleClose, sumbitHadler } = props;
  const [startDate, setStartDate] = useState(new Date(data.start));

  const startInputRef = useRef('0');
  const stopInputRef = useRef('0');

  const onSubmitHandler = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    // Спорное решение. Создал 2 рефа, которые прокинул в TimeInput. Записываю в них текущее значение даты
    const task = {
      _id: data._id,
      start: startInputRef.current,
      stop: stopInputRef.current,
      startDate: startDate.toISOString(),
    };

    sumbitHadler(getResult(task));
  };

  return (
    <StyledDatePickerWrapper>
      <ThemeProvider theme={datePickerTheme}>
        <form onSubmit={onSubmitHandler}>
          <div className='date-inputs-wrapper'>
            <TimeInput
              className='date-picker-input'
              initTime={getHoursAndMinutes(data.start)}
              label={'Start'}
              reffer={startInputRef}
            />
            <TimeInput
              className='date-picker-input'
              initTime={getHoursAndMinutes(data.stop)}
              label={'Stop'}
              reffer={stopInputRef}
            />
          </div>

          <div className='date-picker-wrapper'>
            <DatePicker inline={true} selected={startDate} onChange={(date: Date) => setStartDate(date)} />
          </div>

          <div className='buttons-wrapper'>
            <Button onClick={handleClose} color='secondary' variant='contained'>
              Закрыть
            </Button>
            <Button onClick={handleClose} color='primary' variant='contained' type='submit'>
              Изменить
            </Button>
          </div>
        </form>
      </ThemeProvider>
    </StyledDatePickerWrapper>
  );
};

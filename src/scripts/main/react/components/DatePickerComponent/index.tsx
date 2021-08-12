import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useFormik } from 'formik';

import Button from '@material-ui/core/Button';

import { TimeInput } from './components/TimeInput';
import { getHoursAndMinutes } from 'Utils/Date';

import 'react-datepicker/dist/react-datepicker.css';
import { StyledDatePickerWrapper } from './style/style';
import { datePickerTheme } from './style/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { IDatePicker } from './types';
import { useHandlers } from './hooks/useHandlers';

// https://github.com/Hacker0x01/react-datepicker/
export const DatePickerComponent: React.FC<IDatePicker> = props => {
  const { data, handleClose, sumbitHadler } = props;
  const [startDate, setStartDate, curriedSubmitHandler] = useHandlers(data);

  const onSubmitHandler = curriedSubmitHandler(sumbitHadler);

  const formik = useFormik({
    initialValues: {
      start: getHoursAndMinutes(data.start),
      stop: getHoursAndMinutes(data.stop),
    },
    onSubmit: onSubmitHandler,
  });

  // useEffect(() => {
  //   console.log('Меняю валуе');

  //   formik.setFieldValue('stop', formik.values.start);
  // }, [formik.values.start]);

  return (
    <StyledDatePickerWrapper>
      <ThemeProvider theme={datePickerTheme}>
        {/* <form onSubmit={onSubmitHandler}> */}
        <form onSubmit={formik.handleSubmit}>
          <div className='date-inputs-wrapper'>
            <TimeInput
              name={'start'}
              value={formik.values.start}
              changeHandler={formik.handleChange}
              className='date-picker-input'
              initTime={getHoursAndMinutes(data.start)}
              label={'Start'}
            />
            <TimeInput
              name={'stop'}
              value={formik.values.stop}
              changeHandler={formik.handleChange}
              className='date-picker-input'
              initTime={getHoursAndMinutes(data.stop)}
              label={'Stop'}
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

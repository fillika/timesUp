import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import { useFormik } from 'formik';

import { notifyError } from 'Redux/reducers/notifyReducer/actionCreators';
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
  const dispatch = useDispatch();
  const { data, handleClose, sumbitHadler } = props;
  const [startDate, setStartDate, curriedSubmitHandler] = useHandlers(data);

  const onSubmitHandler = curriedSubmitHandler(sumbitHadler, handleClose);

  const formik = useFormik({
    initialValues: {
      start: getHoursAndMinutes(data.start),
      stop: getHoursAndMinutes(data.stop),
    },
    onSubmit: onSubmitHandler,
    validate: values => {
      const errors: { start?: string; stop?: string } = {};

      if (values.start > values.stop) {
        errors.start = 'Дата начала не может быть позже даты конца';
      }

      return errors;
    },
  });

  const setValueToStart = (value: string) => formik.setFieldValue('start', value);
  const setValueToStop = (value: string) => formik.setFieldValue('stop', value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formik.isValid) {
      formik.handleSubmit(e);
    } else {
      formik.errors.start && dispatch(notifyError(formik.errors.start));
    }
  };

  return (
    <StyledDatePickerWrapper>
      <ThemeProvider theme={datePickerTheme}>
        <form onSubmit={handleSubmit}>
          <div className='date-inputs-wrapper'>
            <TimeInput
              name={'start'}
              value={formik.values.start}
              formikChangeHandler={formik.handleChange}
              setFieldValue={setValueToStart}
              className='date-picker-input'
              label={'Start'}
            />
            <TimeInput
              name={'stop'}
              value={formik.values.stop}
              formikChangeHandler={formik.handleChange}
              setFieldValue={setValueToStop}
              className='date-picker-input'
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
            <Button color='primary' variant='contained' type='submit'>
              Изменить
            </Button>
          </div>
        </form>
      </ThemeProvider>
    </StyledDatePickerWrapper>
  );
};

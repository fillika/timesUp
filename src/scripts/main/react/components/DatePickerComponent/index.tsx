import React, { useState } from 'react';
import ru from 'date-fns/locale/ru';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TimeInput } from './components/TimeInput';

registerLocale('ru', ru);
interface IDatePicker {
  start?: Date;
  stop?: Date;
}

// https://github.com/Hacker0x01/react-datepicker/
export const DatePickerComponent: React.FC<IDatePicker> = props => {
  const { start = new Date(), stop = new Date().getTime() + 1000 } = props;
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div style={{ padding: 20 }}>
      <div>
        <TimeInput initTime='24:42' />
        <TimeInput initTime='23:59' />
      </div>
      <div>
        <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} locale='ru' />
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import curry from 'ramda/src/curry';

import { getResult } from '../components/TimeInput/utils/getResult';
import { TDispatchDatePickerData } from 'App/components/DatePickerComponent/types';

type hadlers = (data: {
  _id: string;
  start: string;
  stop: string;
}) => [
  Date,
  React.MutableRefObject<string>,
  React.MutableRefObject<string>,
  React.Dispatch<React.SetStateAction<Date>>,
  any
];

export const useHandlers: hadlers = data => {
  const [startDate, setStartDate] = useState(new Date(data.start));

  const startInputRef = useRef('0');
  const stopInputRef = useRef('0');

  const curriedSubmitHandler = curry(
    (sumbitHadler: (data: TDispatchDatePickerData) => void, event: React.FormEvent<EventTarget>) => {
      event.preventDefault();
      // Спорное решение. Создал 2 рефа, которые прокинул в TimeInput. Записываю в них текущее значение даты
      const task = {
        _id: data._id,
        start: startInputRef.current,
        stop: stopInputRef.current,
        startDate: startDate.toISOString(),
      };

      sumbitHadler(getResult(task));
    }
  );

  return [startDate, startInputRef, stopInputRef, setStartDate, curriedSubmitHandler];
};

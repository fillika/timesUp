import React, { useState } from 'react';
import curry from 'ramda/src/curry';

import { getResult } from '../components/TimeInput/utils/getResult';
import { TDispatchDatePickerData } from 'App/components/DatePickerComponent/types';

type hadlers = (data: {
  _id: string;
  start: string;
  stop: string;
}) => [Date, React.Dispatch<React.SetStateAction<Date>>, any];

export const useHandlers: hadlers = data => {
  const [startDate, setStartDate] = useState(new Date(data.start));

  const curriedSubmitHandler = curry(
    (
      sumbitHadler: (data: TDispatchDatePickerData) => void,
      cb: () => void,
      values: { start: string; stop: string }
    ) => {
      // Спорное решение. Создал 2 рефа, которые прокинул в TimeInput. Записываю в них текущее значение даты
      const task = {
        _id: data._id,
        start: values.start,
        stop: values.stop,
        startDate: startDate.toISOString(),
      };
      sumbitHadler(getResult(task));
      cb();
    }
  );

  return [startDate, setStartDate, curriedSubmitHandler];
};

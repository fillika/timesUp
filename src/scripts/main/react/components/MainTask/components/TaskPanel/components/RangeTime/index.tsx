import React, { useState } from 'react';
import { time } from 'Utils/Time';
import _isEqual from 'lodash/isEqual';

import { ModalComponent } from 'App/components/Modal';
import { DatePickerComponent } from 'App/components/DatePickerComponent';
import clone from 'ramda/src/clone';
import { TimeType } from 'Types/tasks';
import { StyledRangeTime } from './style';
import { getHoursAndMinutes } from 'Utils/Date';

type RangeTimeProps = {
  data: TFormState;
};

type TFormState = {
  start: string;
  stop: string;
  duration?: number;
  time?: TimeType[];
};

const RangeTime: React.FC<RangeTimeProps> = ({ data: fromState }) => {
  const data = clone(fromState);
  const [isOpened, setIsOpened] = useState(false);
  const handleOpen = () => setIsOpened(true);
  const handleClose = () => setIsOpened(false);

  // * Так как массив всегда отсортирован, то Я могу из него доставать первый и последний элемент
  if (data.time !== undefined) {
    data.stop = data.time[0].stop;
    data.start = data.time[data.time.length - 1].start;
  }

  if (data.duration === undefined) {
    data.duration = new Date(data.stop).getTime() - new Date(data.start).getTime();
  }

  const onClickHandler = () => {
    if (data.time === undefined) {
      // Todo тут вызов модального окна с парметрами
      console.log('То, что надо', data);
      handleOpen();
    }
  };

  return (
    <>
      <StyledRangeTime onClick={onClickHandler}>
        <span className={'total-time'}>{time.countTotalTime(data.duration)}</span>
        <span className={'range-time'}>
          {time.createTemplateTime(data.start)}&nbsp;-&nbsp;{time.createTemplateTime(data.stop)}
        </span>
      </StyledRangeTime>
      <ModalComponent open={isOpened} handleClose={handleClose}>
        <DatePickerComponent
          start={getHoursAndMinutes(data.start)}
          stop={getHoursAndMinutes(data.stop)}
          handleClose={handleClose}
          day={new Date(data.start)}
        />
      </ModalComponent>
    </>
  );
};

export { RangeTime };

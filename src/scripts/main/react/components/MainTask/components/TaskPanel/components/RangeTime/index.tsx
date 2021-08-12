import React, { useEffect } from 'react';

import { time } from 'Utils/Time';
import clone from 'ramda/src/clone';

import { ModalComponent } from 'App/components/Modal';
import { DatePickerComponent } from 'App/components/DatePickerComponent';
import { StyledRangeTime } from './style';
import { RangeTimeProps } from './types';

import { useHandlers } from './hooks/useHandlers';

const RangeTime: React.FC<RangeTimeProps> = ({ data: fromState, setActive }) => {
  const data = clone(fromState);
  const [isOpened, handleClose, onClickHandler, sumbitHadler] = useHandlers(data, setActive);

  // * Так как массив всегда отсортирован, то Я могу из него доставать первый и последний элемент
  if (data.time !== undefined) {
    data.stop = data.time[0].stop;
    data.start = data.time[data.time.length - 1].start;
  }

  if (data.duration === undefined) {
    data.duration = new Date(data.stop).getTime() - new Date(data.start).getTime();
  }

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
          data={{
            _id: data._id,
            start: data.start,
            stop: data.stop,
          }}
          handleClose={handleClose}
          sumbitHadler={sumbitHadler}
        />
      </ModalComponent>
    </>
  );
};

export { RangeTime };

import React from 'react';
import { time } from 'Utils/Time';
import _isEqual from 'lodash/isEqual';
import { TimeType } from 'Types/tasks';
import { StyledRangeTime } from './style';
import { createDeepCopy } from 'Utils/helpers/createDeepCopy';

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
  const data = createDeepCopy<TFormState, TFormState>(fromState);

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
    }
  };

  return (
    <StyledRangeTime onClick={onClickHandler}>
      <span className={'total-time'}>{time.countTotalTime(data.duration)}</span>
      <span className={'range-time'}>
        {time.createTemplateTime(data.start)}&nbsp;-&nbsp;{time.createTemplateTime(data.stop)}
      </span>
    </StyledRangeTime>
  );
};

export { RangeTime };

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { time } from 'Utils/Time';
import clone from 'ramda/src/clone';
import curry from 'ramda/src/curry';

import { ModalComponent } from 'App/components/Modal';
import { DatePickerComponent } from 'App/components/DatePickerComponent';
import { updateTaskDateByID } from 'Redux/reducers/taskReducer/actionCreators';
import { TimeType } from 'Types/tasks';
import { StyledRangeTime } from './style';

type RangeTimeProps = {
  data: TFormState;
  setActive?: React.Dispatch<React.SetStateAction<boolean>>;
};

type TFormState = {
  _id: string;
  start: string;
  stop: string;
  duration?: number;
  time?: TimeType[];
};

type TDatePickerData = {
  _id: string;
  start: string;
  stop: string;
  startDate: string;
};

const RangeTime: React.FC<RangeTimeProps> = ({ data: fromState, setActive }) => {
  const data = clone(fromState);
  const [isOpened, setIsOpened] = useState(false);
  const handleOpen = () => setIsOpened(true);
  const handleClose = () => setIsOpened(false);
  const dispatch = useDispatch();

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
      handleOpen();
    } else {
      if (setActive) setActive(prev => !prev);
    }
  };

  const sumbitHadler = (data: TDatePickerData) => {
    const getHours = (time: string) => Number(time.slice(0, 2));
    const getMinutes = (time: string) => Number(time.slice(3));
    const toISOString = (time: number) => new Date(time).toISOString();

    const calcTime = curry((day: string, time: string) =>
      new Date(day).setHours(getHours(time), getMinutes(time), 0, 0)
    )(data.startDate);

    const getResult = (data: TDatePickerData) => {
      const start = calcTime(data.start);
      const stop = calcTime(data.stop) <= start ? start + 1000 : calcTime(data.stop); // TODO Защита от дурака. Убрать позже
      const at = start + 1000;
      const duration = stop - start;

      return {
        _id: data._id,
        start: toISOString(start),
        stop: toISOString(stop),
        at: toISOString(at),
        duration,
      };
    };

    dispatch(updateTaskDateByID(getResult(data)))

    // console.log(getResult(data));
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

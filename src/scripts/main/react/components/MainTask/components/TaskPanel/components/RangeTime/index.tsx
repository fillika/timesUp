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

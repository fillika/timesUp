import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import styled from 'styled-components';
import { setVolume, sounds } from '../../utils/alarm';

const StyledSlider = styled.div`
  position: absolute;
  right: 0;
  top: 20px;
  height: 200px;

  @media (min-width: 768px) {
    right: 20px;
  }
`;

interface Props {
  children: React.ReactElement;
  open: boolean;
  value: number;
}

function ValueLabelComponent(props: Props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement='top' title={value}>
      {children}
    </Tooltip>
  );
}

export const VolumeSlider = () => {
  const [volume, setVolumeState] = useState<number>(sounds.guitar.volume * 100);

  const changeHandler = (event: object, value: number | number[]) => {
    if (typeof value === 'number') {
      setVolumeState(value);
      setVolume(value * 0.01);
    }
  };

  return (
    <StyledSlider>
      <Slider
        onChange={changeHandler}
        orientation='vertical'
        value={volume}
        aria-labelledby='vertical-slider'
        ValueLabelComponent={ValueLabelComponent}
      />
    </StyledSlider>
  );
};

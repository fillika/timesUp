import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { setVolume, sounds } from '../../utils/alarm';
import { StyledSlider } from './styles';
import { ValueLabelComponent } from './components/ValueLabelComponent';

export const VolumeSlider = () => {
  const [volume, setVolumeState] = useState<number>(sounds.guitar.volume * 100);

  const changeHandler = (_: object, value: number | number[]) => {
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

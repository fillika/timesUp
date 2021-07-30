import React, { useEffect, useRef, useState } from 'react';
import { isValid } from './isValid';

// https://github.com/dima-bu/react-time-input/blob/master/src/timeInput.jsx
interface TTimeInput {
  initTime?: string;
  disabled?: boolean;
  onTimeChange?: any;
  type?: 'text' | 'time';
  onFocusHandler?: any;
  placeholder?: any;
  className?: any;
  name?: any;
  onBlurHandler?: any;
}

export const TimeInput: React.FC<TTimeInput> = ({
  initTime,
  disabled = false,
  onTimeChange,
  type = 'text',
  onFocusHandler,
  placeholder,
  className,
  name,
  onBlurHandler,
}) => {
  const [time, setTime] = useState(initTime || '');
  const [lastVal, setLastVal] = useState('')

  const onChangeHandler = (val: string) => {
    if (val === time) return;

    if (isValid(val)) {
      if (val.length === 2 && lastVal.length !== 3 && val.indexOf(':') === -1) {
        val = val + ':';
      }

      if (val.length === 2 && lastVal.length === 3) {
        val = val.slice(0, 1);
      }

      if (val.length > 5) {
        return false;
      }

      setLastVal(val);
      setTime(val);

      if (val.length === 5 && onTimeChange !== undefined) {
        onTimeChange(val);
      }
    }
  };

  return (
    <input
      name={name ? name : undefined}
      className={className}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      value={time}
      onChange={e => onChangeHandler(e.target.value)}
      onFocus={onFocusHandler ? e => onFocusHandler(e) : undefined}
      onBlur={onBlurHandler ? e => onBlurHandler(e) : undefined}
    />
  );
};

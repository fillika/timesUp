import React, { useEffect, useRef, useState } from 'react';
import { isValid } from './isValid';

// https://github.com/dima-bu/react-time-input/blob/master/src/timeInput.jsx
interface TTimeInput {
  initTime?: string;
  disabled?: boolean;
  mountFocus?: any;
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
  mountFocus,
  onTimeChange,
  type,
  onFocusHandler,
  placeholder,
  className,
  name,
  onBlurHandler,
}) => {
  const [time, setTime] = useState(initTime || '');

  const _input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled && mountFocus) {
      // Очень спорно
      setTimeout(() => {
        if (_input.current instanceof HTMLInputElement) {
          _input.current.focus();
        }
      }, 0);
    }
  });

  let lastVal = '';

  const onChangeHandler = (val: string) => {
    if (val === time) {
      return;
    }

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

      lastVal = val;

      setTime(val);

      if (val.length === 5 && onTimeChange !== undefined) {
        onTimeChange(val);
      }
    }
  };

  const getType = () => {
    if (type) {
      return type;
    }
    return 'text';
  };

  return (
    <input
      name={name ? name : undefined}
      className={className}
      type={getType()}
      disabled={disabled}
      placeholder={placeholder}
      value={time}
      onChange={e => onChangeHandler(e.target.value)}
      onFocus={onFocusHandler ? e => onFocusHandler(e) : undefined}
      onBlur={onBlurHandler ? e => onBlurHandler(e) : undefined}
      ref={_input}
    />
  );
};

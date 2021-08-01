import React from 'react';
import { usePresenter } from './hooks/usePresenter';

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
  const [time, onChangeHandler] = usePresenter(initTime, onTimeChange);

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

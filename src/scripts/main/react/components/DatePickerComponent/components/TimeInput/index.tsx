import React, { useEffect } from 'react';
import { usePresenter } from './hooks/usePresenter';
import TextField from '@material-ui/core/TextField';

// https://github.com/dima-bu/react-time-input/blob/master/src/timeInput.jsx
interface TTimeInput {
  initTime?: string;
  disabled?: boolean;
  type?: 'text' | 'time';
  onFocusHandler?: any;
  placeholder?: any;
  className?: string;
  name?: any;
  label?: string;
  value?: any;
  changeHandler?: any;
}

export const TimeInput: React.FC<TTimeInput> = ({
  initTime,
  disabled = false,
  type = 'text',
  label = '',
  onFocusHandler,
  placeholder,
  className,
  name,
  value,
  changeHandler,
}) => {
  const [onBlurHandler, customValue] = usePresenter(value);

  const change = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    changeHandler(customValue(e));
  };

  return (
    <TextField
      label={label}
      variant='filled'
      name={name ? name : undefined}
      className={className}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      // value={time}
      value={value}
      // onChange={e => onChangeHandler(e.target.value)}
      onChange={change}
      onFocus={onFocusHandler ? e => onFocusHandler(e) : undefined}
      onBlur={e => onBlurHandler(e.target.value)}
    />
  );
};

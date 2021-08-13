import React, { useEffect } from 'react';
import { usePresenter } from './hooks/usePresenter';
import TextField from '@material-ui/core/TextField';

// https://github.com/dima-bu/react-time-input/blob/master/src/timeInput.jsx
interface TTimeInput {
  disabled?: boolean;
  type?: 'text' | 'time';
  onFocusHandler?: any;
  placeholder?: any;
  className?: string;
  name?: any;
  label?: string;
  value?: any;
  formikChangeHandler?: any;
  setFieldValue?: any;
}

export const TimeInput: React.FC<TTimeInput> = ({
  disabled = false,
  type = 'text',
  label = '',
  onFocusHandler,
  placeholder,
  className,
  name,
  value,
  formikChangeHandler,
  setFieldValue,
}) => {
  const [onBlurHandler, onChangeHandler] = usePresenter(name);

  const change = (e: React.ChangeEvent<HTMLInputElement>) => formikChangeHandler(onChangeHandler(e));
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => setFieldValue(onBlurHandler(e));

  return (
    <TextField
      label={label}
      variant='filled'
      name={name ? name : undefined}
      className={className}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={change}
      onBlur={onBlur}
      onFocus={onFocusHandler ? e => onFocusHandler(e) : undefined}
    />
  );
};

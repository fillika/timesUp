import React, { useEffect, ChangeEvent, FC, FocusEvent } from 'react';
import { usePresenter } from './hooks/usePresenter';
import TextField from '@material-ui/core/TextField';

// https://github.com/dima-bu/react-time-input/blob/master/src/timeInput.jsx
interface TTimeInput {
  disabled?: boolean;
  type?: 'text' | 'time';
  onFocusHandler?: (e: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  name?: string;
  label?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  setFieldValue?: (value: string) => void;
}

export const TimeInput: FC<TTimeInput> = ({
  disabled = false,
  type = 'text',
  label = '',
  onFocusHandler,
  placeholder,
  className,
  name,
  value,
  onChange,
  setFieldValue,
}) => {
  const [onBlurHandler, onChangeHandler] = usePresenter();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => onChange && onChange(onChangeHandler(e));
  const blurHandler = (e: FocusEvent<HTMLInputElement>) => setFieldValue && setFieldValue(onBlurHandler(e));

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
      onChange={changeHandler}
      onBlur={blurHandler}
      onFocus={onFocusHandler ? (e: FocusEvent<HTMLInputElement>) => onFocusHandler(e) : undefined}
    />
  );
};

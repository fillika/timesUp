import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

interface Props {
  children: React.ReactElement;
  open: boolean;
  value: number;
}

export const ValueLabelComponent = (props: Props) => {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement='top' title={value}>
      {children}
    </Tooltip>
  );
};

import React from 'react';
import { StyledChildTask } from './style';

export const ChildTask: React.FC<{ name: string }> = ({ name }) => {
  return <StyledChildTask>{name}</StyledChildTask>;
};

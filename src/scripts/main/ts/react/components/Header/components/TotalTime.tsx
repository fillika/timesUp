import React, { memo } from 'react';

export const TotalTime = memo<{ totalTime: string }>(({ totalTime }) => {
  return (
    <div>
      <div>{totalTime}</div>
    </div>
  );
});

import React, { useState } from 'react';
import { asyncStatus } from 'Types/async';

export const useStatusState = (): [asyncStatus, React.Dispatch<React.SetStateAction<asyncStatus>>] => {
  const [status, setStatus] = useState<asyncStatus>('idle');

  return [status, setStatus];
};

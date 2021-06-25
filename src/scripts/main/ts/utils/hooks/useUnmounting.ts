// Utils

import { useEffect, useState } from 'react';

function useUnmounting(time = 500) {
  const [isUnmounting, setUnmount] = useState(false);
  let timeoutID: NodeJS.Timeout;

  useEffect(() => {
    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  const startUnmount = (cb: any): void => {
    setUnmount(true);
    timeoutID = setTimeout(cb, time);
  };

  return [isUnmounting, startUnmount];
}

export { useUnmounting };

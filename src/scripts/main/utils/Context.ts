import { createContext } from 'react';

interface ActiveTaskContext {
  isTimeActive: boolean;
}

export const ActiveTaskContext = createContext<ActiveTaskContext>({
  isTimeActive: false,
});

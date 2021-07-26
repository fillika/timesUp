import { useState } from 'react';

type useGreetingsType = [isRegister: boolean, toggleRegister: () => void];

export function useGreetingsState(): useGreetingsType {
  const [isRegister, setResiter] = useState(true);

  const toggleRegister = () => {
    if (isRegister) {
      let timerID = setTimeout(() => {
        setResiter(!isRegister);
        clearTimeout(timerID);
      }, 210);
    } else {
      setResiter(!isRegister);
    }
  };

  return [isRegister, toggleRegister];
}

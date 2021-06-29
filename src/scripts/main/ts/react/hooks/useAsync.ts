import { useState, useEffect, useCallback } from 'react';

// Todo типизировать кастомный хук
/* @ts-ignore */
export const useAsync = (asyncFunction, immediate: boolean = true) => {
  const [status, setStatus] = useState('idle');
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  // функция "execute" оборачивает asyncFunction и
  // обрабатывает настройку состояний для pending, value и error
  // useCallback предотвращает вызов useEffect при каждом рендеринге
  // useEffect вызывается только при изменении asyncFunction
  const execute = useCallback(() => {
    setStatus('pending');
    setValue(null);
    setError(null);

    return asyncFunction()
    .then((response: Response) => {
        /* @ts-ignore */
        setValue(response);
        setStatus('success');
      })
      /* @ts-ignore */
      .catch(error => {
        setError(error);
        setStatus('error');
      });
  }, [asyncFunction]);

  // вызываем execute для немедленного выполнения
  // с другой стороны, execute может быть вызвана позже
  // например, как обработчик нажатия кнопки
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
};

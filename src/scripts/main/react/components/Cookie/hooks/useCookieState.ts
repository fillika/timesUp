import { useEffect, useState } from 'react';

export const useCookieState = (): [boolean, () => void] => {
  const [isCookieHide, setCookieHide] = useState(false);

  useEffect(() => {
    if (document.cookie.indexOf('cookieAccept=true') != -1) {
      setCookieHide(true);
    }
  }, []);

  const clickHandler = () => {
    const date = new Date(Date.now() + 86400000 * 100)

    document.cookie = 'cookieAccept=true; expires=' + date;
    setCookieHide(true);
  };

  return [isCookieHide, clickHandler];
};

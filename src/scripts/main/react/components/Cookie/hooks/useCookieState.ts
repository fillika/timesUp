import { useEffect, useState } from 'react';

export const useCookieState = (): [boolean, () => void] => {
  const [isCookieHide, setCookieHide] = useState(false);

  useEffect(() => {
    if (document.cookie.indexOf('cookieAccept=true') != -1) {
      setCookieHide(true);
    }
  }, []);

  const onClick = () => {
    document.cookie = 'cookieAccept=true';
    setCookieHide(true);
  };

  return [isCookieHide, onClick];
};

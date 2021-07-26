const TOKEN_KEY = 'JWT';

export const getJWTToken = () => localStorage.getItem(TOKEN_KEY);
export const setJWTToken = (value: string) => localStorage.setItem(TOKEN_KEY, value);
export const removeJWTToken = () => localStorage.removeItem(TOKEN_KEY);

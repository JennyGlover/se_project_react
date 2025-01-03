const TOKEN_KEY = 'jwt';

export const setToken = (token) =>
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));

export const getToken = () => {
  const jwtString = localStorage.getItem(TOKEN_KEY);
  const jwtObject = jwtString ? JSON.parse(jwtString) : null;

  return jwtObject ? jwtObject.token : null;
};

export const removeToken = () => {
  return localStorage.removeItem(TOKEN_KEY);
};

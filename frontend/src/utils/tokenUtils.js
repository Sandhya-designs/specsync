export const getToken = () => localStorage.getItem('token');

export const setToken = (token) => localStorage.setItem('token', token);

export const removeToken = () => localStorage.removeItem('token');

export const isAuthenticated = () => !!getToken();

export const getUser = () => {
  try {
    const user = localStorage.getItem('user');
    if (!user || user === 'undefined' || user === 'null') {
      return null;
    }
    return JSON.parse(user);
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }
};

export const setUser = (user) => localStorage.setItem('user', JSON.stringify(user));

export const removeUser = () => localStorage.removeItem('user');

export const logout = () => {
  removeToken();
  removeUser();
};

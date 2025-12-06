import api from './api';

export const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  if (response.data.success && response.data.data) {
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.data));
    return { token: response.data.data.token, user: response.data.data };
  }
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  if (response.data.success && response.data.data) {
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.data));
    return { token: response.data.data.token, user: response.data.data };
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};

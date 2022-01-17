import api from './api';

export const login = async (email, password) => {
  return api.post('/auth/login', { email, password });
};
export const register = async (email, password, firstname, lastname) => {
  return api.post('/auth/register', { email, password, firstname, lastname });
};

export const checkAuth = async () => {
  return api.get('/users/get_by_token');
};

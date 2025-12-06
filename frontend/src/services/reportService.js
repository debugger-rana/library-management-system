import api from './api';

export const getDashboardStats = async () => {
  const response = await api.get('/reports/dashboard');
  return response.data;
};

export const getOverdueBooks = async () => {
  const response = await api.get('/reports/overdue');
  return response.data;
};

export const getPopularBooks = async () => {
  const response = await api.get('/reports/popular-books');
  return response.data;
};

export const getMemberActivity = async () => {
  const response = await api.get('/reports/member-activity');
  return response.data;
};

export const getFineReport = async () => {
  const response = await api.get('/reports/fines');
  return response.data;
};

export const getActiveIssues = async () => {
  const response = await api.get('/transactions/active');
  return response.data;
};

export const getMasterListBooks = async () => {
  const response = await api.get('/books');
  return response.data;
};

export const getMasterListMovies = async () => {
  const response = await api.get('/books?type=movie');
  return response.data;
};

export const getMasterListMembers = async () => {
  const response = await api.get('/members');
  return response.data;
};

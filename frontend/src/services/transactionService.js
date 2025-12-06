import api from './api';

export const getAllTransactions = async () => {
  const response = await api.get('/transactions');
  return response.data;
};

export const getTransaction = async (id) => {
  const response = await api.get(`/transactions/${id}`);
  return response.data;
};

export const getActiveIssues = async () => {
  const response = await api.get('/transactions/active');
  return response.data;
};

export const issueBook = async (transactionData) => {
  const response = await api.post('/transactions/issue', transactionData);
  return response.data;
};

export const returnBook = async (returnData) => {
  const response = await api.post('/transactions/return', returnData);
  return response.data;
};

export const payFine = async (id) => {
  const response = await api.put(`/transactions/${id}/pay-fine`);
  return response.data;
};

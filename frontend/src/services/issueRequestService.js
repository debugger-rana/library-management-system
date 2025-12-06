import api from './api';

export const getAllRequests = async () => {
  const response = await api.get('/issue-requests');
  return response.data;
};

export const createRequest = async (requestData) => {
  const response = await api.post('/issue-requests', requestData);
  return response.data;
};

export const approveRequest = async (id, remarks) => {
  const response = await api.put(`/issue-requests/${id}/approve`, { remarks });
  return response.data;
};

export const rejectRequest = async (id, remarks) => {
  const response = await api.put(`/issue-requests/${id}/reject`, { remarks });
  return response.data;
};

export const deleteRequest = async (id) => {
  const response = await api.delete(`/issue-requests/${id}`);
  return response.data;
};

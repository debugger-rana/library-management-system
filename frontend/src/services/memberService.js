import api from './api';

export const getAllMembers = async () => {
  const response = await api.get('/members');
  return response.data;
};

export const getMember = async (id) => {
  const response = await api.get(`/members/${id}`);
  return response.data;
};

export const getMemberByNumber = async (membershipNo) => {
  const response = await api.get(`/members/number/${membershipNo}`);
  return response.data;
};

export const createMember = async (memberData) => {
  const response = await api.post('/members', memberData);
  return response.data;
};

export const updateMember = async (id, memberData) => {
  const response = await api.put(`/members/${id}`, memberData);
  return response.data;
};

export const extendMembership = async (id, months) => {
  const response = await api.put(`/members/${id}/extend`, months);
  return response.data;
};

export const cancelMembership = async (id) => {
  const response = await api.put(`/members/${id}/cancel`);
  return response.data;
};

export const deleteMember = async (id) => {
  const response = await api.delete(`/members/${id}`);
  return response.data;
};

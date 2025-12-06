import api from './api';

export const getAllBooks = async () => {
  const response = await api.get('/books');
  return response.data;
};

export const getBook = async (id) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

export const searchBooks = async (params) => {
  const response = await api.get('/books/search', { params });
  return response.data;
};

export const createBook = async (bookData) => {
  const response = await api.post('/books', bookData);
  return response.data;
};

export const updateBook = async (id, bookData) => {
  const response = await api.put(`/books/${id}`, bookData);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};

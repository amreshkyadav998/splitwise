import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });

export async function fetchExpenses() {
  const { data } = await api.get('/expenses');
  return data;
}

export async function createExpense(payload) {
  const { data } = await api.post('/expenses', payload);
  return data;
}

export async function deleteExpense(id) {
  const { data } = await api.delete(`/expenses/${id}`);
  return data;
}

export async function fetchBalances() {
  const { data } = await api.get('/balances');
  return data;
}

export default api;



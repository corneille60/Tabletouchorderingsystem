import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

const getAuthToken = () => {
  return localStorage.getItem('auth_token') || null;
};

export const fetchMenu = (type) => axios.get(`${API_BASE}/api/menu`, { params: { type } }).then(res => res.data);
export const createCustomerCode = (tableNo, token) => axios.post(`${API_BASE}/api/customer-codes`, { table_no: tableNo }, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
export const fetchCustomerCodes = (token) => axios.get(`${API_BASE}/api/customer-codes`, { params: { all: true }, headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
export const createOrder = (payload) => axios.post(`${API_BASE}/api/orders`, payload).then(res => res.data);
export const fetchOrdersByCode = (customer_code) => axios.get(`${API_BASE}/api/orders`, { params: { customer_code } }).then(res => res.data);
export const recordPayment = (payload) => axios.post(`${API_BASE}/api/payments`, payload).then(res => res.data);
export const requestMomoPayment = (payload) => axios.post(`${API_BASE}/api/payments/momo/request`, payload).then(res => res.data);
export const verifyMomoPayment = (txRef, payload) => axios.post(`${API_BASE}/api/payments/momo/status/${txRef}`, payload).then(res => res.data);
export const fetchPayments = (token) => axios.get(`${API_BASE}/api/payments`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
export const fetchReports = (token) => axios.get(`${API_BASE}/api/reports`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
export const login = (payload) => axios.post(`${API_BASE}/api/auth/login`, payload).then(res => res.data);
export const logout = (userId, token) => axios.post(`${API_BASE}/api/auth/logout`, { id: userId }, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
export const fetchStaffOrders = (filter, token) => axios.get(`${API_BASE}/api/orders/all`, { params: filter, headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
export const updateOrderItemStatus = (itemId, payload, token) => axios.post(`${API_BASE}/api/orders/item/${itemId}/status`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
export const createMenuItem = (formData, token) => axios.post(`${API_BASE}/api/menu`, formData, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
export const updateMenuItem = (id, formData, token) => axios.put(`${API_BASE}/api/menu/${id}`, formData, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
export const deleteMenuItem = (id, token) => axios.delete(`${API_BASE}/api/menu/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
export const fetchUsers = (token) => axios.get(`${API_BASE}/api/users`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
export const createUser = (payload, token) => axios.post(`${API_BASE}/api/users`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);

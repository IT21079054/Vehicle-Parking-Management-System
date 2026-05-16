import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// Auth
export const login = (data) => axios.post(`${BASE_URL}/auth/login`, data);

// Vehicles
export const getVehicles = () => axios.get(`${BASE_URL}/vehicles`);
export const getVehicle = (id) => axios.get(`${BASE_URL}/vehicles/${id}`);
export const createVehicle = (data) => axios.post(`${BASE_URL}/vehicles`, data);
export const updateVehicle = (id, data) => axios.put(`${BASE_URL}/vehicles/${id}`, data);
export const deleteVehicle = (id) => axios.delete(`${BASE_URL}/vehicles/${id}`);

// Parking Slots
export const getSlots = () => axios.get(`${BASE_URL}/slots`);
export const getSlot = (id) => axios.get(`${BASE_URL}/slots/${id}`);
export const createSlot = (data) => axios.post(`${BASE_URL}/slots`, data);
export const updateSlot = (id, data) => axios.put(`${BASE_URL}/slots/${id}`, data);
export const deleteSlot = (id) => axios.delete(`${BASE_URL}/slots/${id}`);

// Payments
export const getPayments = () => axios.get(`${BASE_URL}/payments`);
export const getPayment = (id) => axios.get(`${BASE_URL}/payments/${id}`);
export const createPayment = (data) => axios.post(`${BASE_URL}/payments`, data);
export const updatePayment = (id, data) => axios.put(`${BASE_URL}/payments/${id}`, data);
export const deletePayment = (id) => axios.delete(`${BASE_URL}/payments/${id}`);

// Customers
export const getCustomers = () => axios.get(`${BASE_URL}/customers`);
export const getCustomer = (id) => axios.get(`${BASE_URL}/customers/${id}`);
export const createCustomer = (data) => axios.post(`${BASE_URL}/customers`, data);
export const updateCustomer = (id, data) => axios.put(`${BASE_URL}/customers/${id}`, data);
export const deleteCustomer = (id) => axios.delete(`${BASE_URL}/customers/${id}`);

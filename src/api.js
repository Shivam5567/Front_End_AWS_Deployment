import axios from 'axios';

const API = axios.create({
    
baseURL: import.meta.env.VITE_API_URL
});

export const addUser = (userData) => API.post('/add', userData);
export const listUsers = () => API.get('/list');

import axios from './axios';

export const login = (user) => axios.post('/user/login', user);
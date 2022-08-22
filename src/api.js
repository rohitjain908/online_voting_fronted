import axios from './axios';

export const login = (user) => axios.post('/user/login', user);

export const registerVoter = (voter) => axios.post('/user/registerVoter', voter)
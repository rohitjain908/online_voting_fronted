import axios from './axios';

export const login = (user) => axios.post('/user/login', user);

export const registerVoter = (voter) => axios.post('/user/registerVoter', voter)

export const votesList = (obj) => axios.post('/voting/votesList', obj)

export const voterList = (obj) => axios.post('/voting/voterList', obj)

export const getVoter = (obj) => axios.post('/voting/getVoter', obj);

export const editVoter = (obj) => axios.post('/voting/editVoter', obj);
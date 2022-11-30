import axios from './axios';

export const login = (user) => axios.post('/user/login', user);

export const registerVoter = (voter) => axios.post('/user/registerVoter', voter)

export const validateToken = (obj) => axios.post('/user/validateToken', obj);

export const votesList = (obj) => axios.post('/voting/votesList', obj)

export const voterList = (obj) => axios.post('/voting/voterList', obj)

export const getVoter = (obj) => axios.post('/voting/getVoter', obj);

export const editVoter = (obj) => axios.post('/voting/editVoter', obj);

export const deleteVoter = (obj) => axios.post('/voting/deleteVoter', obj);

export const candidatesList = (obj) => axios.post('/voting/candidatesList', obj)

export const positionsList = (obj) => axios.post('/voting/positionsList', obj)

export const addCandidate = (obj) => axios.post('/voting/addCandidate', obj);

export const getCandidate = (obj) => axios.post('/voting/getCandidate', obj);

export const editCandidate = (obj) => axios.post('/voting/editCandidate', obj);

export const deleteCandidate = (obj) => axios.post('/voting/deleteCandidate', obj);

export const ballotPosition = (obj) => axios.post('/voting/ballotPosition', obj);

export const addPosition = (obj) => axios.post('/voting/addPosition', obj);

export const getPosition = (obj) => axios.post('/voting/getPosition', obj);

export const editPosition = (obj) => axios.post('/voting/editPosition', obj);

export const deletePosition = (obj) => axios.post('/voting/deletePosition', obj);

export const getDashBoardData = (obj) => axios.post('/voting/getDashBoardData', obj);

export const isVoted = (obj) => axios.post('/voting/isVoted', obj);

export const voterBallot = (obj) => axios.post('/voting/voterBallot', obj);

export const submitBallot = (obj) => axios.post('/voting/submitBallot', obj);
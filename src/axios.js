import axios from 'axios';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
	baseURL: 'http://127.0.0.1:8000/',
	headers: { Authorization: `Bearer ${token}`,'Content-type': 'application/json' }
});

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);
export default axiosInstance;


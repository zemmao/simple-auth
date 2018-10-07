import axios from 'axios';
const { UNAUTHORIZED } = require('http-status');

const client = axios.create({
  baseURL: process.env.SERVER_ENDPOINT,
  headers: { 'Content-Type': 'application/json' }
});

client.interceptors.request.use(config => {
  const token = window.localStorage.getItem('APP_TOKEN');
  if (token) {
    config.headers['Authorization'] = `JWT ${token}`;
  } else if (!token && config.headers['Authorization']) {
    delete config.headers['Authorization'];
  }
  return config;
});

client.interceptors.response.use(res => res, err => {
  if (err.response.status === UNAUTHORIZED) {
    window.localStorage.removeItem('APP_TOKEN');
    window.location.reload();
  } else {
    throw err;
  }
});

export default client;

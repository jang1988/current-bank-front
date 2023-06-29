import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api-current-bank.up.railway.app'
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});


export default instance
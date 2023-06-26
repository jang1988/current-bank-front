import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://ec2-16-171-25-213.eu-north-1.compute.amazonaws.com'
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
  });

export default instance
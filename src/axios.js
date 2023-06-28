import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://elated-deer-loincloth.cyclic.app'
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  config.headers['Access-Control-Allow-Origin'] = '*';
  config.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
  return config;
});


export default instance
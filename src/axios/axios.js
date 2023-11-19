import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api/';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.x_authorization =  token;
     
    return config;
});


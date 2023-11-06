import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api/';

axios.defaults.headers.common['x_authorization'] = 'Bearer' + localStorage.getItem('token');
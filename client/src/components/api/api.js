import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pint-f1tf.onrender.com' 
});

export default api;

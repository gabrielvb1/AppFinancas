import axios from  'axios'
export default axios.create({
    baseURL: 'https://app-financas-server.onrender.com',
    timeout:10000,
    headers:{'Content-Type': 'application/json'}
});
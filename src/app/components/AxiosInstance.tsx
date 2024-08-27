import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_APIURL,
});
// headers: {'X-Custom-Header': 'foobar'}

export default axiosInstance
import axios from "axios";

export const baseURL = 'http://203.161.32.12:5500';
// export const baseURL = 'http://localhost:5500';

const Axios = axios.create({
    baseURL : `${baseURL}/api` ,
});

export default Axios;
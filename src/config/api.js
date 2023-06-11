import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "redux/actions/authActions";

export const baseURL = 'https://server.eaglexgroup.com';
// export const baseURL = 'http://203.161.32.12:5500';
// export const baseURL = 'http://localhost:5500';



const Axios = axios.create({
    baseURL : `${baseURL}/api` ,
});


export const useApi = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    Axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                dispatch(logout(navigate , false)); 
                localStorage.setItem('user' , null)
            }
            return Promise.reject(error);
        }
    );
    return Axios;
};

export default Axios;
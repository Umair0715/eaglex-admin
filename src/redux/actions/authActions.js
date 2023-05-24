import Axios from 'config/api';
import { setLoading, setUser } from 'redux/reducers/authReducer';
import { toast } from 'react-toastify';
import toastError from 'utils/toastError';


export const login = (data , navigate ) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const { data : { data : { message , doc } } } = await Axios.post('/admin/login' , data );
        dispatch(setUser({...doc }));
        localStorage.setItem('user' , JSON.stringify({...doc }));
        dispatch(setLoading(false));
        navigate('/');
        toast.success(message);
    } catch (err) {
        dispatch(setLoading(false));
        console.log('login error' , err);
        toastError(err)
    }
}

export const logout = (navigate) => async(dispatch , getState) => {
    dispatch(setLoading(true));
    try {
        Axios('/admin/logout' );
        dispatch(setUser(null));
        localStorage.setItem('user' , null);
        dispatch(setLoading(false));
        navigate('/login');
        toast.success('Logged out successfully.')
    } catch (err) {
        dispatch(setLoading(false));
        console.log('logout error' , err);
        toastError(err)
    }
}
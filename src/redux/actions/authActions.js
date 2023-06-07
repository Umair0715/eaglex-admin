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

export const logout = (navigate , showToast = true) => async(dispatch) => {
    dispatch(setLoading(true));
    try {
        await Axios('/admin/logout');
        dispatch(setUser(null));
        localStorage.removeItem('user');
        dispatch(setLoading(false));
        navigate('/login');
        if(showToast){
            toast.success('Logged out successfully.')
        }
    } catch (err) {
        dispatch(setLoading(false));
        console.log('logout error' , err);
        toastError(err);
    }
}
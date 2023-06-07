import Axios from 'config/api';
import { setLoading, setUsers , setUpdateLoading , setUserDetails , removeUser , updateUser , setCurrentPage , setPages , setDocsCount, setDeleteLoading } from 'redux/reducers/userReducer';
import { toast } from 'react-toastify';
import toastError from 'utils/toastError';


export const getAllUsers = (range , keyword = '') => async (dispatch , getState) => {
    dispatch(setLoading(true))
    try {
        const { data : { data : { docs , page , pages , docCount } } } = await Axios(`/user/all?range=${range}&keyword=${keyword}&page=${getState()?.user?.currentPage}` , {
            headers : {
                Authorization : `Bearer ${getState().auth.user.token}`
            }
        } );
        dispatch(setUsers(docs));
        dispatch(setCurrentPage(page));
        dispatch(setPages(pages));
        dispatch(setDocsCount(docCount));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

export const getUserDetails = (userId) => async (dispatch , getState) => {
    dispatch(setLoading(true))
    try {
        const { data : { data : { doc } } } = await Axios(`/user/details/${userId}` , {
            headers : {
                Authorization : `Bearer ${getState().auth.user.token}`
            }
        } );
        dispatch(setUserDetails(doc));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

export const editUser = (userId , updateData ) => async (dispatch , getState) => {
    dispatch(setUpdateLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.put(`/user/edit/${userId}` , updateData , {
            headers : {
                Authorization : `Bearer ${getState().auth.user.token}`
            }
        });
        toast.success(message)
        dispatch(updateUser(doc));
        dispatch(setUpdateLoading(false));
    } catch (err) {
        dispatch(setUpdateLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

export const deleteUser = (userId) => async (dispatch , getState) => {
    dispatch(setDeleteLoading(true))
    try {
        const { data : { data : { message } } } = await Axios.delete(`/user/delete/${userId}` , {
            headers : {
                Authorization : `Bearer ${getState().auth.user.token}`
            }
        } );
        toast.success(message)
        dispatch(removeUser(userId));
        dispatch(setDeleteLoading(false));
    } catch (err) {
        dispatch(setDeleteLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

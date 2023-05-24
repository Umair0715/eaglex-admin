import Axios from 'config/api';
import { setLoading, setDocs , setUpdateLoading , setDocDetails , removeDoc , updateDoc , setCurrentPage , setPages , setDocsCount , addDoc, setCreateLoading, setDeleteLoading } from 'redux/reducers/companyReducer';
import { toast } from 'react-toastify';
import toastError from 'utils/toastError';

export const createCompany = (data , navigate) => async (dispatch , getState) => {
    dispatch(setCreateLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.post(`/company` , data , {
            headers : {
                Authorization : `Bearer ${getState().auth.user.token}`
            }
        } );
        dispatch(addDoc(doc));
        toast.success(message);
        navigate('/companies')
        dispatch(setCreateLoading(false));
    } catch (err) {
        dispatch(setCreateLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

export const getAllCompanies = () => async (dispatch , getState) => {
    dispatch(setLoading(true))
    try {
        const { data : { data : { docs , page , pages , docCount } } } = await Axios(`/company` , {
            headers : {
                Authorization : `Bearer ${getState().auth.user.token}`
            }
        } );
        dispatch(setDocs(docs));
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

export const getTotalCompanies = () => async (dispatch , getState) => {
    dispatch(setLoading(true))
    try {
        const { data : { data : { docs } } } = await Axios(`/company/get/total` , {
            headers : {
                Authorization : `Bearer ${getState().auth.user.token}`
            }
        } );
        dispatch(setDocs(docs));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

export const getCompanyDetails = (companyId) => async (dispatch , getState) => {
    dispatch(setLoading(true))
    try {
        const { data : { data : { doc } } } = await Axios(`/company/${companyId}` , {
            headers : {
                Authorization : `Bearer ${getState().auth.user.token}`
            }
        } );
        dispatch(setDocDetails(doc));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

export const editCompany = (companyId , updateData ) => async (dispatch , getState) => {
    dispatch(setUpdateLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.put(`/company/${companyId}` , updateData , {
            headers : {
                Authorization : `Bearer ${getState().auth.user.token}`
            }
        });
        toast.success(message)
        dispatch(updateDoc(doc));
        dispatch(setUpdateLoading(false));
    } catch (err) {
        dispatch(setUpdateLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

export const deleteCompany = (companyId) => async (dispatch , getState) => {
    dispatch(setDeleteLoading(true))
    try {
        const { data : { data : { message } } } = await Axios.delete(`/company/${companyId}` , {
            headers : {
                Authorization : `Bearer ${getState().auth.user.token}`
            }
        } );
        toast.success(message)
        dispatch(removeDoc(companyId));
        dispatch(setDeleteLoading(false));
    } catch (err) {
        dispatch(setDeleteLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

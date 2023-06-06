import Axios from 'config/api';
import { setLoading, setDocs , setUpdateLoading , setDocDetails , removeDoc , updateDoc , setCurrentPage , setPages , setDocsCount , addDoc, setCreateLoading, setDeleteLoading } from 'redux/reducers/offerReducer';
import { toast } from 'react-toastify';
import toastError from 'utils/toastError';

export const createOffer = (data , navigate) => async (dispatch , getState) => {
    dispatch(setCreateLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.post(`/offer` , data , {
            headers : {
                Authorization : `Bearer ${getState().auth.user.token}`
            }
        } );
        dispatch(addDoc(doc));
        toast.success(message);
        navigate('/offers-management/offers')
        dispatch(setCreateLoading(false));
    } catch (err) {
        dispatch(setCreateLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

export const getAllOffers = () => async (dispatch , getState) => {
    dispatch(setLoading(true))
    try {
        const { data : { data : { docs , page , pages , docCount } } } = await Axios(`/offer` , {
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

export const getOfferDetails = (offerId) => async (dispatch , getState) => {
    dispatch(setLoading(true))
    try {
        const { data : { data : { doc } } } = await Axios(`/offer/${offerId}` , {
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

export const editOffer = (offerId , updateData , navigate) => async (dispatch , getState) => {
    dispatch(setUpdateLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.put(`/offer/${offerId}` , updateData , {
            headers : {
                Authorization : `Bearer ${getState().auth.user.token}`
            }
        });
        toast.success(message)
        dispatch(updateDoc(doc));
        navigate('/offers-management/offers')
        dispatch(setUpdateLoading(false));
    } catch (err) {
        dispatch(setUpdateLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

export const deleteOffer = (offerId) => async (dispatch , getState) => {
    dispatch(setDeleteLoading(true))
    try {
        const { data : { data : { message } } } = await Axios.delete(`/offer/${offerId}` , {
            headers : {
                Authorization : `Bearer ${getState().auth.user.token}`
            }
        } );
        toast.success(message)
        dispatch(removeDoc(offerId));
        dispatch(setDeleteLoading(false));
    } catch (err) {
        dispatch(setDeleteLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}
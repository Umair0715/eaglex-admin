import Axios from 'config/api';
import { setLoading , setDocs , setDocDetails , setCurrentPage , setPages , setDocsCount } from 'redux/reducers/investReducer';
import { toast } from 'react-toastify';
import toastError from 'utils/toastError';


export const getAllInvests = () => async (dispatch , getState) => {
    dispatch(setLoading(true))
    try {
        const { data : { data : { docs , page , pages , docCount } } } = await Axios(`/invest` , {
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

export const getInvestDetails = (itemId) => async (dispatch , getState) => {
    dispatch(setLoading(true))
    try {
        const { data : { data : { doc } } } = await Axios(`/invest/${itemId}` , {
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


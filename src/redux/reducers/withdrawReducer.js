import { createSlice } from "@reduxjs/toolkit";

const withdrawSlice = createSlice({
    name : 'withdraw' ,
    initialState : {
        requests : [] ,
        requestDetails : null ,
        loading : false , 
        updateLoading : false , 
        deleteLoading : false , 
        currentPage : 1 ,
        pages : 1 , 
        docsCount : 0
    } , 
    reducers : {
        setDocs (state , action) {
            state.requests = action.payload
        } ,
        setDocDetails (state , action) {
            state.requestDetails = action.payload
        } ,
        updateDoc (state , action) {
            const index = state.requests.findIndex(i => i._id === action.payload._id);
            state.requests[index] = action.payload;
            state.requestDetails = action.payload;
        } ,
        removeDoc (state , action) {
            state.requests = state.requests.filter(i => i._id !== action.payload);
        } , 
        setLoading (state , action) {
            state.loading = action.payload;
        } ,
        setUpdateLoading (state , action ) {
            state.updateLoading = action.payload
        } ,
        setDeleteLoading (state , action ) {
            state.deleteLoading = action.payload
        } ,
        setCurrentPage (state , action) {
            state.currentPage = action.payload;
        } ,
        setPages (state , action) {
            state.pages = action.payload;
        } ,
        setDocsCount (state , action) {
            state.docsCount = action.payload;
        }
    }
});

export const { 
    setDocs , setDocDetails , setLoading , setCreateLoading , setUpdateLoading , setDeleteLoading , setCurrentPage , setPages , updateDoc , removeDoc , setDocsCount , addDoc 
} = withdrawSlice.actions;

export default withdrawSlice.reducer;
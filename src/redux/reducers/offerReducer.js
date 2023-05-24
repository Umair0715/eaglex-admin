import { createSlice } from "@reduxjs/toolkit";

const offerSlice = createSlice({
    name : 'offer' ,
    initialState : {
        offers : [] ,
        offerDetails : null ,
        loading : false , 
        createLoading : false , 
        updateLoading : false , 
        deleteLoading : false , 
        currentPage : 1 ,
        pages : 1 , 
        docsCount : 0
    } , 
    reducers : {
        setDocs (state , action) {
            state.offers = action.payload
        } ,
        setDocDetails (state , action) {
            state.offerDetails = action.payload
        } ,
        addDoc (state , action) {
            state.offers = state.offers.unshift(action.payload);
        } ,
        updateDoc (state , action) {
            const index = state.offers.findIndex(i => i._id === action.payload._id);
            state.offers[index] = action.payload;
            state.offerDetails = action.payload;
        } ,
        removeDoc (state , action) {
            state.offers = state.offers.filter(i => i._id !== action.payload);
        } , 
        setLoading (state , action) {
            state.loading = action.payload;
        } ,
        setUpdateLoading (state , action ) {
            state.updateLoading = action.payload
        } ,
        setCreateLoading (state , action ) {
            state.createLoading = action.payload
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
} = offerSlice.actions;

export default offerSlice.reducer;
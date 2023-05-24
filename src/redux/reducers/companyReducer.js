import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name : 'company' ,
    initialState : {
        companies : [] ,
        companyDetails : null ,
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
            state.companies = action.payload
        } ,
        setDocDetails (state , action) {
            state.companyDetails = action.payload
        } ,
        addDoc (state , action) {
            state.companies = state.companies.unshift(action.payload);
        } ,
        updateDoc (state , action) {
            const index = state.companies.findIndex(i => i._id === action.payload._id);
            state.companies[index] = action.payload;
            state.companyDetails = action.payload;
        } ,
        removeDoc (state , action) {
            state.companies = state.companies.filter(i => i._id !== action.payload);
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
} = companySlice.actions;

export default companySlice.reducer;
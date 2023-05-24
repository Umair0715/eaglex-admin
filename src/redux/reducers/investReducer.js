import { createSlice } from "@reduxjs/toolkit";

const investSlice = createSlice({
    name : 'bank' ,
    initialState : {
        invests : [] ,
        investDetails : null ,
        loading : false , 
        currentPage : 1 ,
        pages : 1 , 
        docsCount : 0
    } , 
    reducers : {
        setDocs (state , action) {
            state.invests = action.payload
        } ,
        setDocDetails (state , action) {
            state.investDetails = action.payload
        } ,
        setLoading (state , action) {
            state.loading = action.payload;
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
    setDocs , setDocDetails , setLoading , setCurrentPage , setPages , setDocsCount 
} = investSlice.actions;

export default investSlice.reducer;
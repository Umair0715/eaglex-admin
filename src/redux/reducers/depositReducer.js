import { createSlice } from "@reduxjs/toolkit";

const depositSlice = createSlice({
    name : 'offer' ,
    initialState : {
        deposits : [] ,
        depositDetails : null ,
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
            state.deposits = action.payload
        } ,
        setDocDetails (state , action) {
            state.depositDetails = action.payload
        } ,
        updateDoc (state , action) {
            const index = state.deposits.findIndex(i => i._id === action.payload._id);
            state.deposits[index] = action.payload;
            state.depositDetails = action.payload;
        } ,
        removeDoc (state , action) {
            state.deposits = state.deposits.filter(i => i._id !== action.payload);
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
    setDocs , setDocDetails , setLoading , setUpdateLoading , setDeleteLoading , setCurrentPage , setPages , updateDoc , removeDoc , setDocsCount  
} = depositSlice.actions;

export default depositSlice.reducer;
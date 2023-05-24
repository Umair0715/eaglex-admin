import { createSlice } from "@reduxjs/toolkit";

const bankSlice = createSlice({
    name : 'bank' ,
    initialState : {
        banks : [] ,
        bankDetails : null ,
        loading : false , 
        updateLoading : false , 
        deleteLoading : false , 
        currentPage : 1 ,
        pages : 1 , 
        docsCount : 0
    } , 
    reducers : {
        setDocs (state , action) {
            state.banks = action.payload
        } ,
        setDocDetails (state , action) {
            state.bankDetails = action.payload
        } ,
        updateDoc (state , action) {
            const index = state.banks.findIndex(i => i._id === action.payload._id);
            state.banks[index] = action.payload;
            state.bankDetails = action.payload;
        } ,
        removeDoc (state , action) {
            state.banks = state.banks.filter(i => i._id !== action.payload);
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
} = bankSlice.actions;

export default bankSlice.reducer;
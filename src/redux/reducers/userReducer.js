import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'user' ,
    initialState : {
        users : [] ,
        userDetails : null ,
        loading : false ,
        updateLoading : false ,
        deleteLoading : false ,
        currentPage : 1 ,
        pages : 1 ,
        docsCount : 1
    } , 
    reducers : {
        setUsers (state , action) {
            state.users = action.payload;
        } ,
        updateUser (state , action) {
            const index = state.users.findIndex(i => i._id === action.payload._id);
            state.users[index] = action.payload;
        } ,
        removeUser (state , action) {
            state.users = state.users.filter(i => i._id !== action.payload);
        } , 
        setUserDetails (state , action) {
            state.userDetails = action.payload;
        } ,
        setLoading (state , action) {
            state.loading = action.payload 
        } ,
        setUpdateLoading(state , action) {
            state.updateLoading = action.payload;
        } ,
        setDeleteLoading (state , action) {
            state.deleteLoading = action.payload 
        } ,
        setCurrentPage (state ,action) {
            state.currentPage = action.payload;
        } ,
        setPages (state ,action) {
            state.pages = action.payload;
        } ,
        setDocsCount (state ,action) {
            state.docsCount = action.payload;
        }
    }
});

export const { setUsers , updateUser , removeUser , setUserDetails , setUpdateLoading , setLoading , setDeleteLoading , setCurrentPage , setDocsCount , setPages } = userSlice.actions;

export default userSlice.reducer;
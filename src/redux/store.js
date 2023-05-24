import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import companyReducer from "./reducers/companyReducer";
import offerReducer from "./reducers/offerReducer";
import depositReducer from "./reducers/depositReducer";
import withdrawReducer from "./reducers/withdrawReducer";
import bankReducer from "./reducers/bankReducer";
import changeBankReducer from "./reducers/changeBankReducer";
import investReducer from "./reducers/investReducer";

const store = configureStore({
    reducer : {
        auth : authReducer , 
        user : userReducer ,
        company : companyReducer ,
        offer : offerReducer ,
        deposit : depositReducer ,
        withdraw : withdrawReducer ,
        bank : bankReducer ,
        changeBank : changeBankReducer ,
        invest : investReducer
    },
});

export default store;
import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import './utilities.css';
import App from './App';

import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';

import DrawerContextProvider from 'context/DrawerContext';
import store from 'redux/store';
import { Provider } from 'react-redux';

// React Query
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ChatContextProvider from 'context/chatContext';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <DrawerContextProvider>
        <Provider store={store}>
            <ChatContextProvider>
                <QueryClientProvider client={queryClient}>
                    <App />
                {/* <ReactQueryDevtools />  */}
                </QueryClientProvider>
            </ChatContextProvider>
        </Provider>
    </DrawerContextProvider>
);
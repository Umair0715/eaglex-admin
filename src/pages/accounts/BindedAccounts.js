import BindedAccountsTable from 'components/accounts/BindedAccountsTable'
import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import ItemNotFound from 'components/global/ItemNotFound'
import Layout from 'components/global/Layout'
import Loader from 'components/global/Loader'
import Axios from 'config/api'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage, setDocs, setPages } from 'redux/reducers/bankReducer'
import fetcher from 'utils/fetcher'

const BindedAccounts = () => {
    const dispatch = useDispatch();
    const { banks , currentPage } = useSelector(state => state.bank);
    const { user } = useSelector(state => state.auth);

    const queryKey = ['fetch-banks' , currentPage];
    const { isLoading , data } = useQuery(queryKey , () => {
        return Axios(`/bank?page=${currentPage}`);
    });

    useEffect(() => {
        if(data) {
            const { data : { data : { docs , page , pages } } } = data;
            dispatch(setDocs(docs));
            dispatch(setCurrentPage(page));
            dispatch(setPages(pages));
        }
    }, [dispatch , data])

    return (
        <Layout>
            <div className='flex items-center justify-between gap-4'>
                <Heading title='Withdrawl Accounts' showIcon={false} />
                <BackBtn />
            </div>
            <div className='mt-4'>
                {
                    isLoading 
                    ? 
                        <Loader />
                    : 
                    banks?.length > 0 
                    ? 
                        <BindedAccountsTable />
                    : 
                        <ItemNotFound />
                }
            </div>
        </Layout>
    )
}

export default BindedAccounts
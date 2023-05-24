import BankChangeRequestsTable from 'components/accounts/BackChangeRequestsTable'
import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import ItemNotFound from 'components/global/ItemNotFound'
import Layout from 'components/global/Layout'
import Loader from 'components/global/Loader'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage, setDocs, setPages } from 'redux/reducers/changeBankReducer'
import fetcher from 'utils/fetcher'

const BankChangeRequests = () => {
    const dispatch = useDispatch();
    const { banks , currentPage } = useSelector(state => state.changeBank);
    const { user } = useSelector(state => state.auth);

    const queryKey = ['fetch-change-banks' , currentPage];
    const { isLoading , data } = useQuery(queryKey , () => {
        return fetcher(`/change-bank?page=${currentPage}`, user);
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
            <div className='flex items-center justify-between '>
                <Heading title="Bank Change Requests" showIcon={false} />
                <BackBtn />
            </div>
            <div className='mt-6'>
            {
                    isLoading 
                    ? 
                        <Loader />
                    : 
                    banks?.length > 0 
                    ? 
                        <BankChangeRequestsTable />
                    : 
                        <ItemNotFound />
                }
            </div>
        </Layout>
    )
}

export default BankChangeRequests
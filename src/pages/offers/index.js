import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import ItemNotFound from 'components/global/ItemNotFound'
import Layout from 'components/global/Layout'
import Loader from 'components/global/Loader'
import OffersTable from 'components/offers/OffersTable'
import Axios from 'config/api'
import { useGetAllOffers } from 'hooks/useOffers'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllOffers } from 'redux/actions/offerActions'
import { setDocs , setPages , setCurrentPage, setDocsCount } from 'redux/reducers/offerReducer'

const Offers = () => {
    const dispatch = useDispatch();
    const { offers , docsCount } = useSelector(state => state.offer);

    const { isLoading , data } = useQuery('fetch-offers' , () => Axios(`/offer`));


    useEffect(() => {
        if(data){
            dispatch(setDocs(data?.data?.data?.docs));
            dispatch(setDocsCount(data?.data?.data?.docCount));
            // dispatch(setCurrentPage(data?.data?.data?.page));
            // dispatch(setPages(data?.data?.data?.pages));

            // pagination hmny backend sy remove kr di h
        }
    }, [data , dispatch]);

    return (
        <Layout>
            <div>
                <BackBtn />
                <div className='mt-4 flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <Heading title='All Offers' icon='clipboard-notes'  />
                        <div className='bg-gray-200 font-semibold rounded-md px-2 py-0.5 text-lg text-primary'>
                            {docsCount}
                        </div>
                    </div>
                    <div>
                        <Link
                        to='/offers-management/add-new' 
                        className="btn-primary py-2 px-6">
                            Add New
                        </Link>
                    </div>
                </div>
                <div className='mt-6'>
                    {
                        isLoading 
                        ? 
                            <Loader />
                        : 
                        offers?.length > 0 
                        ? 
                            <OffersTable />
                        : 
                            <ItemNotFound message='No offer found.' />
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Offers
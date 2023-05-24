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
import { setDocs , setPages , setCurrentPage } from 'redux/reducers/offerReducer'

const Offers = () => {
    const dispatch = useDispatch();
    const { offers , currentPage } = useSelector(state => state.offer);

    const queryKey = ['fetch-offers' , currentPage]
    const { isLoading , data } = useQuery(queryKey , () => Axios(`/offer?page=${currentPage}`));


    useEffect(() => {
        if(data){
            dispatch(setDocs(data?.data?.data?.docs));
            dispatch(setCurrentPage(data?.data?.data?.page));
            dispatch(setPages(data?.data?.data?.pages));
        }
    }, [data , dispatch]);

    return (
        <Layout>
            <div>
                <BackBtn />
                <div className='mt-4 flex items-center justify-between'>
                    <div>
                        <Heading title='All Offers' icon='clipboard-notes'  />
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
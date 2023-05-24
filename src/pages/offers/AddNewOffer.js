import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'
import AddNewOfferForm from 'components/offers/AddNewOfferForm'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const AddNewOffer = () => {

    const { companies , loading } = useSelector(state => state.company);
    const { createLoading } = useSelector(state => state.offer);

    useEffect(() => {
        
    }, [])

    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between'>
                    <div>
                        <Heading title='Add New Offer' />
                    </div>
                    <div>
                        <BackBtn />            
                    </div>
                </div>
                <div>
                    <AddNewOfferForm />
                </div>
            </div>
        </Layout>
    )
}

export default AddNewOffer
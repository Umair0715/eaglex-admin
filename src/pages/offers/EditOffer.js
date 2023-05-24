import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'
import EditOfferForm from 'components/offers/EditOfferForm'
import React from 'react'

const EditOffer = () => {
    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between'>
                    <div>
                        <Heading title='Edit Offer' icon='pen' />
                    </div>
                    <div>
                        <BackBtn />            
                    </div>
                </div>
                <div>
                    <EditOfferForm />
                </div>
            </div>
        </Layout>
    )
}

export default EditOffer
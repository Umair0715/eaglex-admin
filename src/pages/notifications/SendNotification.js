import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'
import NotificationForm from 'components/notifications/NotificationForm'
import OffersTable from 'components/offers/OffersTable'
import React from 'react'
import { Link } from 'react-router-dom'

const SendNotification = () => {
    return (
        <Layout>
            <div>
                <div className='mt-4 flex items-center justify-between'>
                    <div>
                        <Heading title='Notifications' icon='bell'  />
                    </div>
                    <div>
                        <BackBtn />                        
                    </div>
                </div>
                <div className='mt-6'>
                    <NotificationForm />
                </div>
            </div>
        </Layout>
    )
}

export default SendNotification;
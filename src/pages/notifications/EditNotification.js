import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'
import EditNotificationForm from 'components/notifications/EditNotificationForm'
import React from 'react'

const EditNotification = () => {
    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between'>
                    <div>
                        <Heading title='Edit Notification' icon='pen' />
                    </div>
                    <div>
                        <BackBtn />            
                    </div>
                </div>
                <div>
                    <EditNotificationForm />
                </div>
            </div>
        </Layout>
    )
}

export default EditNotification;

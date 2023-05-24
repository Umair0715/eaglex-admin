import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'
import NotificationTable from 'components/notifications/NotificationTable'
import React from 'react'
import { Link } from 'react-router-dom'

const Notifications = () => {
    return (
        <Layout>
            <div>
                <BackBtn />
                <div className='mt-4 flex items-center justify-between'>
                    <div>
                        <Heading title='Notifications'   />
                    </div>
                    <div>
                        <Link
                            
                            to='/notifications/send-notification' 
                            className="btn-primary py-2 px-6">
                            <i className='uil uil-plus-circle text-white'></i>
                            Send Notification
                        </Link>
                    </div>
                </div>
                <div className='mt-6'>
                    <NotificationTable />
                </div>
            </div>
        </Layout>
    )
}

export default Notifications

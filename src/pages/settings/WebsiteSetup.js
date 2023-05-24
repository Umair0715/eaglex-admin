import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'
import WebsiteSetupForm from 'components/settings/WebsiteSetupForm'
import React from 'react'

const WebsiteSetup = () => {
    return (
        <Layout>
            <div>              
                <div className='mt-4 flex items-center justify-between'>
                    <div>
                        <Heading title='Website Setup' icon='setting'  />
                    </div>
                    <div>
                        <BackBtn />
                    </div>
                </div>
                <div className='mt-6'>
                    <WebsiteSetupForm />
                </div>
            </div>
        </Layout>
    )
}

export default WebsiteSetup

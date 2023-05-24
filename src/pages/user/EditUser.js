import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'
import EditUserForm from 'components/user/EditUserForm'
import React from 'react'

const EditUser = () => {
    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between'>
                    <div>
                        <Heading title='Edit User' icon='pen' />
                    </div>
                    <div>
                        <BackBtn />            
                    </div>
                </div>
                <div>
                    <EditUserForm />
                </div>
            </div>
        </Layout>
    )
}

export default EditUser
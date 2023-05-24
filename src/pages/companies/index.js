import CompanyTable from 'components/company/CompanyTable'
import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'
import React from 'react'
import { Link } from 'react-router-dom'

const Companies = () => {
    return (
        <Layout>
            <div>
                <BackBtn />
                <div className='mt-4 flex items-center justify-between'>
                    <div>
                        <Heading title='All Companies' icon='clipboard-notes'  />
                    </div>
                    <div>
                        <Link
                        to='/companies/add-new' 
                        className="btn-primary py-2 px-6">
                            Add New
                        </Link>
                    </div>
                </div>
                <div className='mt-6'>
                    <CompanyTable />
                </div>
            </div>
        </Layout>
    )
}

export default Companies
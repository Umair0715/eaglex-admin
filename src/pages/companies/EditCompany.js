import EditCompanyForm from 'components/company/EditCompanyForm'
import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'

const EditCompany = () => {
    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between'>
                    <div>
                        <Heading title='Update Company' icon='pen' />
                    </div>
                    <div>
                        <BackBtn />            
                    </div>
                </div>
                <div className='mt-4'>
                    <EditCompanyForm />
                </div>
            </div>
        </Layout>
    )
}

export default EditCompany;

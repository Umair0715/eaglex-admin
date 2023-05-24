import AddCompanyForm from 'components/company/AddCompanyForm'
import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'

const AddCompany = () => {
    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between'>
                    <div>
                        <Heading title='Add New Company' />
                    </div>
                    <div>
                        <BackBtn />            
                    </div>
                </div>
                <div className='mt-4'>
                    <AddCompanyForm />
                </div>
            </div>
        </Layout>
    )
}

export default AddCompany;

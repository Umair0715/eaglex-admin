import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'
import Search from 'components/global/Search'
import SelectBox from 'components/global/SelectBox'
import UsersTable from 'components/user/UsersTable'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from 'redux/actions/userActions'

const Users = () => {

    const [range , setRange] = useState('');
    const [search , setSearch] = useState('');

    const dispatch = useDispatch();
    const { currentPage  } = useSelector(state => state.user);
    
    useEffect(() => {
        dispatch(getAllUsers(range, search))
    },[currentPage , range]);

    const searchFetcher = async (value) => {
        dispatch(getAllUsers(range , value));
    }

    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between gap-4 sm:flex-row flex-col">
                    <BackBtn />
                </div>
                <div className='mt-8 flex sm:flex-row flex-col gap-4 items-center justify-between'>
                    <div>
                        <Heading title='All Users' icon='clipboard-notes'  />
                    </div>
                    <div>
                        <Search setSearch={setSearch} fetcher={searchFetcher} />
                    </div>
                </div>
                <div className='mt-6'>
                    <UsersTable range={range} setRange={setRange} />
                </div>
            </div>
        </Layout>
    )
}

export default Users
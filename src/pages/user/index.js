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
    const [searchType , setSearchType] = useState('phone');
    const [sort , setSort] = useState('createdAt');

    const dispatch = useDispatch();
    const { currentPage , docsCount  } = useSelector(state => state.user);
    
    useEffect(() => {
        dispatch(getAllUsers(range, search , searchType , sort))
    },[currentPage , range , sort]);

    const searchFetcher = async (value) => {
        dispatch(getAllUsers(range , value , searchType , sort ));
    }

    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between gap-4 sm:flex-row flex-col">
                    <BackBtn />
                </div>
                <div className='mt-8 flex sm:flex-row flex-col gap-4 items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <Heading title='All Users' icon='clipboard-notes'  />
                        <div className='bg-gray-200 font-semibold rounded-md px-2 py-0.5 text-lg text-primary'>
                            {docsCount}
                        </div>
                    </div>
                    <div className='flex sm:flex-row flex-col items-center gap-2 '>
                        <label className='font-semibold text-dark'>Search Type</label>
                        <select 
                        className='select-box'
                        onChange={e => setSearchType(e.target.value)}
                        >
                            <option value="phone">Phone</option>
                            <option value="name">Name</option>
                        </select>
                        <Search setSearch={setSearch} fetcher={searchFetcher} />
                    </div>
                </div>
                <div className='mt-6'>
                    <UsersTable 
                    range={range} 
                    setRange={setRange}
                    sort={sort}
                    setSort={setSort}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default Users
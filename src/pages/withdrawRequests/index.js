import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import ItemNotFound from 'components/global/ItemNotFound'
import Layout from 'components/global/Layout'
import Loader from 'components/global/Loader'
import Search from 'components/global/Search'
import WithdrawTable from 'components/withdrawRequests/WithdrawTable'
import Axios from 'config/api'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage, setDocs, setPages } from 'redux/reducers/withdrawReducer'
import fetcher from 'utils/fetcher'
import toastError from 'utils/toastError'

const WithdrawRequests = () => {
    const dispatch = useDispatch();
    const [status , setStatus] = useState('');
    const [search , setSearch] = useState('');
    const [searchLoading , setSearchLoading] = useState(false);
    const [range , setRange] = useState('');
    const { currentPage , requests } = useSelector(state => state.withdraw);
    const { user } = useSelector(state => state.auth);

    const queryKey = ['fetch-withdraw-requests' , currentPage , status , range];
    const url = `/withdraw?status=${status}&page=${currentPage}&keyword=${search}&range=${range}`;
    const { data , isLoading } = useQuery(queryKey , () => fetcher(url , user) );

    useEffect(() => {
        if(data) {
            const { data : { data : { docs , pages , page } } } = data;
            dispatch(setDocs(docs));
            dispatch(setCurrentPage(page));
            dispatch(setPages(pages));
        }
    }, [dispatch , data]);

    const searchFetcher = async (value) => {
        try {
            setSearchLoading(true);
            const { data : { data : { docs , page , pages } } } = await Axios(`/withdraw?keyword=${value}`);
            dispatch(setDocs(docs));
            dispatch(setCurrentPage(page));
            dispatch(setPages(pages));
            setSearchLoading(false);
        } catch (error) {
            setSearch(false);
            toastError(error);
        }
    }

    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between gap-4 sm:flex-row flex-col">
                    <BackBtn />
                </div>
                <div className='mt-8 flex sm:flex-row flex-col gap-4 items-center justify-between'>
                    <div>
                        <Heading 
                        title='Withdraw Requests' 
                        icon='clipboard-notes'  
                        />
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-medium text-gray-500'>
                            Status
                        </label>
                        <select 
                        className='select-box'
                        onChange={e => setStatus(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="declined">Declined</option>
                        </select>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-medium text-gray-500'>
                            Duration
                        </label>
                        <select 
                        className='sm:w-[200px] w-[100px] py-1.5 px-3 border border-dark rounded-full'
                        onChange={(e) => setRange(e.target.value) }
                        >
                            <option value="">All</option>
                            <option value="today">Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="week">This Week</option>
                        </select>
                </div>
                </div>
                <div className='mt-6 w-[300px]'>
                    <Search 
                    setSearch={setSearch}
                    fetcher={searchFetcher}
                    />
                </div>
                
                <div className='mt-6'>
                    {
                        isLoading || searchLoading
                        ? 
                            <Loader />
                        : 
                        requests?.length > 0 
                        ?
                            <WithdrawTable />
                        : 
                            <ItemNotFound message='Nothing to show.' />
                    }
                </div>
            </div>
        </Layout>
    )
}

export default WithdrawRequests
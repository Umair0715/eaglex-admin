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
import { useParams } from 'react-router-dom'
import { setCurrentPage, setDocs, setPages } from 'redux/reducers/withdrawReducer'
import fetcher from 'utils/fetcher'
import toastError from 'utils/toastError'

const UserWithdrawDetails = () => {
    const dispatch = useDispatch();
    const [status , setStatus] = useState('');
    const [range , setRange] = useState('');
    const { currentPage , requests } = useSelector(state => state.withdraw);
    const { user } = useSelector(state => state.auth);
    const { id } = useParams();
    const queryKey = ['fetch-single-user-withdraw-requests' , currentPage , status , range];
    const url = `/withdraw/user/${id}?status=${status}&page=${currentPage}&range=${range}`;
    const { data , isLoading } = useQuery(queryKey , () => fetcher(url , user) );

    useEffect(() => {
        if(data) {
            const { data : { data : { docs , pages , page } } } = data;
            dispatch(setDocs(docs));
            dispatch(setCurrentPage(page));
            dispatch(setPages(pages));
        }
    }, [dispatch , data]);


    return (
        <div>
            <div className='mt-8 flex sm:flex-row flex-col gap-4 items-center justify-between'>
                <h3 className='heading-sm'>Withdrawals</h3>
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
            <div className='mt-6'>
                {
                    isLoading 
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
    )
}

export default UserWithdrawDetails
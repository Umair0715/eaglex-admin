import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import ItemNotFound from 'components/global/ItemNotFound'
import Layout from 'components/global/Layout'
import Loader from 'components/global/Loader'
import WithdrawTable from 'components/withdrawRequests/WithdrawTable'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage, setDocs, setPages } from 'redux/reducers/withdrawReducer'
import fetcher from 'utils/fetcher'

const WithdrawRequests = () => {
    const dispatch = useDispatch();
    const [status , setStatus] = useState('');

    const { currentPage , requests } = useSelector(state => state.withdraw);
    const { user } = useSelector(state => state.auth);

    const queryKey = ['fetch-withdraw-requests' , currentPage , status];
    const url = `/withdraw?status=${status}&page=${currentPage}`;
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
                    <div>
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
        </Layout>
    )
}

export default WithdrawRequests
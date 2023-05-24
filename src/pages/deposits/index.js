import DepositRequestsTable from 'components/depositRequests/DepositRequestsTable'
import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import ItemNotFound from 'components/global/ItemNotFound'
import Layout from 'components/global/Layout'
import Loader from 'components/global/Loader'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage, setDocs, setPages } from 'redux/reducers/depositReducer'
import fetcher from 'utils/fetcher'

const Deposits = () => {
    const dispatch = useDispatch();
    const [status , setStatus] = useState('');

    const { currentPage , deposits } = useSelector(state => state.deposit);
    const { user } = useSelector(state => state.auth);

    const queryKey = ['fetch-deposit-requests' , currentPage , status];
    const url = `/deposit?status=${status}&currentPage=${currentPage}`;
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
                        title='Deposits History' 
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
                            <option value="approved">Approved</option>
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
                        deposits?.length > 0 
                        ?
                            <DepositRequestsTable />
                        : 
                            <ItemNotFound message='Nothing to show.' />
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Deposits
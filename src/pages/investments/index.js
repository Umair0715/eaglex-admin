import DepositRequestsTable from 'components/depositRequests/DepositRequestsTable'
import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import ItemNotFound from 'components/global/ItemNotFound'
import Layout from 'components/global/Layout'
import Loader from 'components/global/Loader'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage, setDocs, setPages } from 'redux/reducers/investReducer'
import fetcher from 'utils/fetcher';
import InvestsTable from './InvestsTable'

const Investments = () => {
    const dispatch = useDispatch();
    const [status , setStatus] = useState('');

    const { currentPage , invests } = useSelector(state => state.invest);
    const { user } = useSelector(state => state.auth);

    const queryKey = ['fetch-invest-requests' , currentPage , status];
    const url = `/invest?status=${status}&page=${currentPage}`;
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
                        title='Invests History' 
                        icon='clipboard-notes'  
                        />
                    </div>
                    <div>
                        <select 
                        className='select-box'
                        onChange={e => setStatus(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="running">Running</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
                <div className='mt-6'>
                    {
                        isLoading
                        ? 
                            <Loader />
                        : 
                        invests?.length > 0 
                        ?
                            <InvestsTable />
                        : 
                            <ItemNotFound message='Nothing to show.' />
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Investments
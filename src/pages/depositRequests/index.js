import DepositDetailsPopup from 'components/depositRequests/DepositDetailsPopup'
import DepositRequestsTable from 'components/depositRequests/DepositRequestsTable'
import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import ItemNotFound from 'components/global/ItemNotFound'
import Layout from 'components/global/Layout'
import Loader from 'components/global/Loader'
import Axios from 'config/api'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage, setDocs, setPages } from 'redux/reducers/depositReducer'
import fetcher from 'utils/fetcher'



const DepositRequests = () => {
    const dispatch = useDispatch();

    const { currentPage , deposits } = useSelector(state => state.deposit);
    const { user } = useSelector(state => state.auth);

    const queryKey = ['fetch-deposit-requests' , currentPage]
    const { data , isLoading } = useQuery(queryKey , () => fetcher(`/deposit?currentPage=${currentPage}&status=pending` , user) );

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
                        title='Pending Deposit Requests' 
                        icon='clipboard-notes'  
                        />
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
                            <ItemNotFound message='No Pending request found.' />
                    }
                </div>

                
            </div>
        </Layout>
    )
}

export default DepositRequests;
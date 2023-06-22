import DepositDetailsPopup from 'components/depositRequests/DepositDetailsPopup'
import DepositRequestsTable from 'components/depositRequests/DepositRequestsTable'
import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import ItemNotFound from 'components/global/ItemNotFound'
import Layout from 'components/global/Layout'
import Loader from 'components/global/Loader'
import Search from 'components/global/Search'
import Axios from 'config/api'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage, setDocs, setPages } from 'redux/reducers/depositReducer'
import fetcher from 'utils/fetcher'
import toastError from 'utils/toastError'



const DepositRequests = () => {
    const dispatch = useDispatch();
    const [search , setSearch] = useState('');
    const [searchLoading , setSearchLoading] = useState(false);
    const { currentPage , deposits } = useSelector(state => state.deposit);
    const { user } = useSelector(state => state.auth);

    const queryKey = ['fetch-deposit-requests' , currentPage]
    const { data , isLoading } = useQuery(queryKey , () => fetcher(`/deposit?page=${currentPage}&status=pending&keyword=${search}` , user) );

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
            const { data : { data : { docs , page , pages } } } = await Axios(`/deposit?status=pending&keyword=${value}` , {
                headers : {
                    Authorization : `Bearer ${user?.token}`
                }
            });
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
                        title='Pending Deposit Requests' 
                        icon='clipboard-notes'  
                        />
                    </div>
                    <div>
                        <Search
                        setSearch={setSearch}
                        fetcher={searchFetcher}
                        />
                    </div>
                </div>
                <div className='mt-6'>
                    {
                        isLoading || searchLoading
                        ? 
                            <Loader />
                        : 
                        deposits?.length > 0 
                        ?
                            <DepositRequestsTable />
                        : 
                            <ItemNotFound message='No    request found.' />
                    }
                </div>

                
            </div>
        </Layout>
    )
}

export default DepositRequests;
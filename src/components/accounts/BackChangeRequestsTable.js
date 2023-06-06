import RequestStatus from 'components/global/RequestStatus';
import Pagination from 'components/global/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { editChangeBank } from 'redux/actions/changeBankActions';
import { setCurrentPage } from 'redux/reducers/changeBankReducer';


const BankChangeRequestsTable = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { banks , currentPage , pages } = useSelector(state => state.changeBank);

    const updateHandler = async (itemId , status) => {
        if(window.confirm(`Are you sure? You want to ${status.toUpperCase()} this request?`)){
            dispatch(editChangeBank(itemId , { status }));
        }
    } 

    return (
        <div className=" shadow-bg rounded-lg">
            <div className='overflow-auto'>
                <table className="w-full overflow-x-auto ">
                    <thead className="border-b text-sm">
                        <tr className='bg-gradient text-white'>
                            <th scope="col" className=" font-medium px-6 py-4 text-left">
                                User Name
                            </th>
                            <th scope="col" className=" font-medium px-6 py-4 text-left">
                                Prev Bank Name
                            </th>
                            <th scope="col" className=" font-medium px-6 py-4 text-left">
                                Prev Account Holder
                            </th>
                            <th scope="col" className=" font-medium px-6 py-4 text-left">
                                Prev Account Number
                            </th>
                            <th scope="col" className=" font-medium px-6 py-4 text-left">
                                New Bank Name
                            </th>
                            <th scope="col" className=" font-medium px-6 py-4 text-left">
                                New Account Holder
                            </th>
                            <th scope="col" className=" font-medium px-6 py-4 text-left">
                                New Account Number
                            </th>
                            <th scope="col" className=" font-medium px-6 py-4 text-left">
                                Status
                            </th>
                            <th scope="col" className=" font-medium px-6 py-4 text-center">
                                ACTIONS
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-sm'>
                    {
                            banks?.map((item , i) => (
                                <tr
                                key={item._id} 
                                className="bg-white border-b transition duration-300 ease-in-out"
                                >
                                <td className="px-6 py-4 whitespace-nowrap ">
                                {
                                    item?.user 
                                    ? 
                                    <Link
                                    className='underline text-primary' 
                                    to={`/user-management/users/${item?.user?._id}`}>
                                        {item?.user?.firstName + " " + item?.user?.lastName}
                                    </Link>
                                    : 
                                        <p className='text-red-500'>User Deleted</p>
                                }
                            </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                    {item?.prevBankDetails?.bankName}
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                    {item?.prevBankDetails?.accountHolder}
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                    {item?.prevBankDetails?.accountNo}
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                    {item?.newBankName}
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                    {item?.newBankAccountHolder}
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                    {item?.newBankAccountNo}
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                    <RequestStatus status={item?.status} />
                                </td>
                                <td className="text-gray-900  px-6 py-4 whitespace-nowrap">
                                    <div className='flex items-center justify-center gap-3'>
                                        <button 
                                        className='accept disabled:cursor-not-allowed' 
                                        title={item?.status === 'approved' ? "Approved request can't be changed." :'Accept Change Request '}
                                        disabled={item?.status === 'approved' || !item?.user}
                                        onClick={() => updateHandler(item?._id , 'approved')}
                                        >
                                            <i className="uil uil-check"></i>
                                        </button>
                                        <button 
                                        className='cancel disabled:cursor-not-allowed' 
                                        title={item?.status === 'approved' ? "Approved request can't be changed." : 'Declined Request'}
                                        disabled={item?.status === 'approved'}
                                        onClick={() => updateHandler(item?._id , 'declined')}
                                        >
                                            <i className="uil uil-times"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            ))
                    }
                    
                    </tbody>
                </table>
            </div>
            {
                <Pagination 
                currentPage={currentPage}
                pageCount={pages}
                setPage={setCurrentPage}
                />
            }
        </div>
    )
}

export default BankChangeRequestsTable;
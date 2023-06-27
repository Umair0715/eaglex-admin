import Pagination from 'components/global/pagination';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useClickOutside from 'utils/clickOutside';
import usersData from 'data/users'
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import fetcher from 'utils/fetcher';
import Loader from 'components/global/Loader';
import ItemNotFound from 'components/global/ItemNotFound';
import moment from 'moment';
import RequestStatus from 'components/global/RequestStatus';

const DepositsTable = () => {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const { id } = useParams();
    const [deposits , setDeposits] = useState('');
    const [currentPage , setCurrentPage] = useState(1);
    const [pages , setPages] = useState(1);


    const queryKey = ['fetch-deposits' , currentPage , id]
    const { data : depositData , isLoading  } = useQuery(queryKey , () => {
        return fetcher(`/deposit/user/${id}?page=${currentPage}` , user)
    });


    useEffect(() => {
        if (depositData) {
            setDeposits(depositData?.data?.data?.docs);
            setCurrentPage(depositData?.data?.data?.page);
            setPages(depositData?.data?.data?.pages);
        }
    } , [depositData]);

    return (
        
        <div className=" shadow-bg overflow-x-auto rounded-lg">
            {
                isLoading
                ? 
                    <Loader />
                : 
                deposits?.length > 0 
                ? 
                <>
                    <table className="w-full table-auto overflow-x-auto ">
                        <thead className="border-b text-sm">
                            <tr className='bg-gradient text-white'>
                                <th scope="col" className=" font-medium px-6 py-4 text-left">
                                    Full Name
                                </th>
                                <th scope="col" className=" font-medium px-6 py-4 text-left">
                                    Deposit Amount
                                </th>
                                <th scope="col" className=" font-medium px-6 py-4 text-left">
                                    Date
                                </th>
                                <th scope="col" className=" font-medium px-6 py-4 text-center">
                                    Status
                                </th>
                                <th scope="col" className=" font-medium px-6 py-4 text-center">
                                    View
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-sm'>
                        {
                                deposits?.map((item , i) => (
                                    <tr
                                    key={item._id} 
                                    className="bg-white border-b transition duration-300 ease-in-out"
                                    >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item?.user?.firstName + " " + item?.user?.lastName}
                                    </td>
                                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                        {item?.amount}
                                    </td>
                                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                        {moment(item?.createdAt).format('DD MMM YYYY ')}
                                    </td>
                                    <td className=" px-6 py-4 whitespace-nowrap text-center text-orange-500">
                                        <div className='flex items-center justify-center'>
                                        <RequestStatus status={item?.status} />
                                        </div>
                                    </td>
                                    <td className=" px-6 py-4 whitespace-nowrap text-center text-orange-500">
                                        <div
                                        className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center justify-center gap-1 underline text-primary '
                                        onClick={() => {
                                            navigate(`/deposit-requests/details/${item?._id}`)
                                        }}
                                            >
                                                <span>Details</span>
                                        </div>
                                    </td>
                                </tr>
                                ))
                        }
                        
                        </tbody>
                    </table>
                    {
                        <Pagination 
                        currentPage={currentPage}
                        pageCount={pages}
                        setPage={setCurrentPage}
                        redux={false}
                        />
                    }
                </>
                : 
                    <ItemNotFound message='No deposit found.' />
            }
        </div>
    )
}

export default DepositsTable;
import Pagination from 'components/global/pagination';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import useClickOutside from 'utils/clickOutside';
import usersData from 'data/users'
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import fetcher from 'utils/fetcher';
import moment from 'moment';
import RequestStatus from 'components/global/RequestStatus';
import Loader from 'components/global/Loader';
import ItemNotFound from 'components/global/ItemNotFound';

const InvestsTable = () => {
    const { user } = useSelector(state => state.auth);
    const { id } = useParams();
    const [invests , setInvests] = useState([]);
    const [currentPage , setCurrentPage] = useState(1);
    const [pages , setPages] = useState(1);

    const queryKey = ['fetch-user-invests' , currentPage]
    const { data , isLoading  } = useQuery(queryKey , () => {
        return fetcher(`/invest/user/${id}?page=${currentPage}` , user)
    });


    useEffect(() => {
        if (data) {
            setInvests(data?.data?.data?.docs);
            setCurrentPage(data?.data?.data?.page);
            setPages(data?.data?.data?.pages);
        }
    } , [data]);

    return (
        <div className=" shadow-bg overflow-x-auto rounded-lg">
            {
                isLoading
                ? 
                    <Loader />
                : 
                invests?.length > 0 
                ?
                    <>
                        <table className="w-full table-auto overflow-x-auto ">
                            <thead className="border-b text-sm">
                                <tr className='bg-gradient text-white'>
                                    <th scope="col" className=" font-medium px-6 py-4 text-left">
                                        Full Name
                                    </th>
                                    <th scope="col" className=" font-medium px-6 py-4 text-left">
                                        invest Amount
                                    </th>
                                    <th scope="col" className=" font-medium px-6 py-4 text-left">
                                        Offer Name
                                    </th>
                                    <th scope="col" className=" font-medium px-6 py-4 text-left">
                                        Company Name
                                    </th>
                                    <th scope="col" className=" font-medium px-6 py-4 text-left">
                                        Time Period
                                    </th>
                                    <th scope="col" className=" font-medium px-6 py-4 text-left">
                                        Date
                                    </th>
                                    <th scope="col" className=" font-medium px-6 py-4 text-center">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='text-sm'>
                            {
                                    invests?.map((item , i) => (
                                        <tr
                                        key={item._id} 
                                        className="bg-white border-b transition duration-300 ease-in-out"
                                        >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link to={`/user-management/users/${item?._id}`}>
                                                {item?.user?.firstName + ' ' + item?.user?.lastName}
                                            </Link>
                                        </td>
                                        <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                            {item?.amount}
                                        </td>
                                        <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                            {item?.offer?.name}
                                        </td>
                                        <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                            {item?.offer?.company?.name}
                                        </td>
                                        <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                            {item?.offer?.timePeriod} Days
                                        </td>
                                        <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                            {moment(item?.createdAt).format('DD MMM YYYY')}
                                        </td>
                                        <td className=" px-6 py-4 whitespace-nowrap text-right ">
                                            <div>
                                                <RequestStatus status={item?.status} />
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
                    <ItemNotFound message='No invest history found.' />
            }
        </div>
    )
}

export default InvestsTable;
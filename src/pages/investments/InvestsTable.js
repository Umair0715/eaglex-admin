import Pagination from 'components/global/pagination';
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { setCurrentPage } from 'redux/reducers/investReducer';
import RequestStatus from 'components/global/RequestStatus';

const InvestsTable = () => {
    const navigate = useNavigate();
    
    const { invests , currentPage , pages } = useSelector(state => state.invest); 

    return (
        <div className=" shadow-bg overflow-x-auto rounded-lg">
            <table className="w-full table-auto overflow-x-auto ">
                <thead className="border-b text-sm">
                    <tr className='bg-gradient text-white'>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Username
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Offer Name
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Invested Amount
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Return Profit % 
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Status 
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Date
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-center">
                            Action
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
                                {item?.offer?.name}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                {item?.amount}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                {item?.offer?.profit}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                <div>
                                    <RequestStatus status={item?.status} />
                                </div>
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {moment(item?.createdAt).format('DD MMM YYYY')}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap ">
                                <div
                                    className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1 underline text-primary'
                                    onClick={() => {
                                        navigate(`/investments/details/${item?._id}`)
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
                />
            }
        </div>
    )
}

export default InvestsTable;
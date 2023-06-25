import Pagination from 'components/global/pagination';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import useClickOutside from 'utils/clickOutside';
import usersData from 'data/users'
import RequestStatus from 'components/global/RequestStatus';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { setCurrentPage } from 'redux/reducers/withdrawReducer';

const WithdrawTable = () => {
    const dropMenuRef = useRef(null);
    const [showDropMenu , setShowDropMenu] = useState(false);
    const [selectedMenuIndex , setSelectedMenuIndex]  = useState(0);
    
    const { requests , currentPage , pages } = useSelector(state => state.withdraw);

    useClickOutside(dropMenuRef , () => setShowDropMenu(false));

    return (
        <div className=" shadow-bg overflow-x-auto rounded-lg">
            <table className="w-full table-auto overflow-x-auto ">
                <thead className="border-b text-sm">
                    <tr className='bg-gradient text-white'>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Username
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-center ">
                            Phone no
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-center">
                            Withdraw Amount
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-center">
                            Service Charges
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-center">
                            Transfer Amount
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-center">
                            Date
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-center">
                           Status
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-center">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className='text-sm'>
                   {
                        requests?.map((item , i) => (
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
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                {item?.user?.phone || '//'}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                {item?.withdrawAmount}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                {item?.withdrawFee || 0}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                {item?.receivedAmount || 0}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                {moment(item?.createdAt).format('DD MMM YYYY')}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                <div className='flex items-center justify-center'>
                                    <RequestStatus status={item?.status} />
                                </div>
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap ">
                                <div className='flex items-end justify-center relative' 
                                >  
                                    <div className='bg-gray-500 py-1.5 px-4 flex items-center rounded-md text-pure gap-2 text-lg w-fit cursor-pointer'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowDropMenu(prev => !prev);
                                        setSelectedMenuIndex(i);
                                    }}
                                    >
                                        <div><i className="uil uil-setting"></i></div>
                                        <div><i className="uil uil-angle-down"></i></div>
                                    </div>
                                    {/* DROP MENU */}
                                    {   
                                        showDropMenu && selectedMenuIndex === i &&
                                        <div className='absolute top-10  bg-pure shadow-lg w-[120px] h-auto rounded-lg z-[50] border flex flex-col'
                                        ref={dropMenuRef}
                                        >
                                            <Link to={`/withdraw-requests/update/${item?._id}`}
                                            className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'>
                                                <span>Edit</span>
                                            </Link>
                                            
                                            {/* <div className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer'>
                                                Delete
                                            </div> */}
                                        </div>
                                    }
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

export default WithdrawTable;

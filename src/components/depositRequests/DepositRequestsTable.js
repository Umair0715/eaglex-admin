import Pagination from 'components/global/pagination';
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useClickOutside from 'utils/clickOutside';
import usersData from 'data/users'
import DepositDetailsPopup from './DepositDetailsPopup';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { setCurrentPage } from 'redux/reducers/depositReducer';
import DepositStatus from 'components/global/DepositStatus';

const DepositRequestsTable = () => {
    const navigate = useNavigate();
    const dropMenuRef = useRef(null);
    const [showDropMenu , setShowDropMenu] = useState(false);
    const [selectedMenuIndex , setSelectedMenuIndex]  = useState(0);
    
    const { deposits , currentPage , pages } = useSelector(state => state.deposit); 

    const [showDepositDetails , setShowDepositDetails] = useState(false);

    useClickOutside(dropMenuRef , () => setShowDropMenu(false));

    return (
        <div className=" shadow-bg overflow-x-auto rounded-lg">
            <table className="w-full table-auto overflow-x-auto ">
                <thead className="border-b text-sm">
                    <tr className='bg-gradient text-white'>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Username
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Phone
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Deposit Amount
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            From bank 
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
                        deposits?.map((item , i) => (
                            <tr
                            key={item._id} 
                            className="bg-white border-b transition duration-300 ease-in-out"
                            >
                            <td className="px-6 py-4 whitespace-nowrap underline text-primary">
                                <Link to={`/user-management/users/${item?.user?._id}`}>
                                    {item?.user?.firstName + " " + item?.user?.lastName}
                                </Link>
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.user?.phone}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                {item?.amount}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                {item?.bankName}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                <div>
                                    <DepositStatus status={item?.status} />
                                </div>
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {moment(item?.createdAt).format('DD MMM YYYY')}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap ">
                                <div
                                    className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1 underline text-primary'
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
                />
            }

            {showDepositDetails && <DepositDetailsPopup setShowDepositDetails={setShowDepositDetails} /> }
        </div>
    )
}

export default DepositRequestsTable;
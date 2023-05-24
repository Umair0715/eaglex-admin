import Pagination from 'components/global/pagination';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import useClickOutside from 'utils/clickOutside';
import usersData from 'data/users'

const DepositsTable = () => {
    const dropMenuRef = useRef(null);
    const [showDropMenu , setShowDropMenu] = useState(false);
    const [selectedMenuIndex , setSelectedMenuIndex]  = useState(0);
    const [selectAll , setSelectAll] = useState(false);
    const [users, setUsers] = useState(usersData.map(item => (
        {...item , isSelected : false }
    )));

    useClickOutside(dropMenuRef , () => setShowDropMenu(false));

    return (
        <div className=" shadow-bg overflow-x-auto rounded-lg">
            <table className="w-full table-auto overflow-x-auto ">
                <thead className="border-b text-sm">
                    <tr className='bg-gradient text-white'>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            User Name
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Deposit Amount
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
                        users.slice(1)?.map((item , i) => (
                            <tr
                            key={item.id} 
                            className="bg-white border-b transition duration-300 ease-in-out"
                            >
                            <td className="px-6 py-4 whitespace-nowrap underline text-primary">
                                <Link to='/user-management/users/1'>
                                    John Doe
                                </Link>
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                5000
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                Opan
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                Tesla
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                10days
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                23 April 2023
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-right text-orange-500">
                                running
                            </td>
                        </tr>
                        ))
                   }
                
                </tbody>
            </table>
            {
                <Pagination 
                currentPage={1}
                pageCount={5}
                setPage={''}
                />
            }
        </div>
    )
}

export default DepositsTable;
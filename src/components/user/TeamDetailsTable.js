import Pagination from 'components/global/pagination';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import useClickOutside from 'utils/clickOutside';
import users from 'data/users'

const TeamDetailsTable = () => {
    const dropMenuRef = useRef(null);
    const [showDropMenu , setShowDropMenu] = useState(false);
    const [selectedMenuIndex , setSelectedMenuIndex]  = useState(0);

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
                            Phone Number
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Active Deposit
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-center">
                            Team Level
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
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                <Link 
                                to={`/user-management/users/${item.id}`}
                                className='text-primary underline'
                                >
                                    John Doe
                                </Link>
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                03229939399
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                5000
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                {i === 1 ? 1 : i === 2 ? 2 : i=== 3 ? 3 : 2}
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

export default TeamDetailsTable;
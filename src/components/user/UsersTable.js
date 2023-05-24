import Pagination from 'components/global/pagination';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import useClickOutside from 'utils/clickOutside';
import usersData from 'data/users'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from 'redux/actions/userActions';
import { setCurrentPage } from 'redux/reducers/userReducer';
import Loader from 'components/global/Loader';
import ItemNotFound from 'components/global/ItemNotFound';

const UsersTable = ({ setRange}) => {
    const dropMenuRef = useRef(null);
    const [showDropMenu , setShowDropMenu] = useState(false);
    const [selectedMenuIndex , setSelectedMenuIndex]  = useState(0);

    const { users , loading , currentPage , pages } = useSelector(state => state.user);

    useClickOutside(dropMenuRef , () => setShowDropMenu(false));

 

    return (
        <div className=" shadow-bg overflow-x-auto rounded-lg">
            <div className='py-4 px-4 flex justify-end'>
                <select 
                className='sm:w-[200px] w-[100px] py-1.5 px-3 border border-dark rounded-full'
                onChange={(e) => setRange(e.target.value) }
                >
                    <option value="">All</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                </select>
            </div>
            {
                loading
                ?
                    <Loader />
                : 
                    <>
                    <table className="w-full table-auto overflow-x-auto ">
                        <thead className="border-b text-sm">
                            <tr className='bg-gradient text-white'>
                                <th scope="col" className=" font-medium px-6 py-4 text-left">
                                    First Name
                                </th>
                                <th scope="col" className=" font-medium px-6 py-4 text-left">
                                    Last Name
                                </th>
                                <th scope="col" className=" font-medium px-6 py-4 text-left">
                                    Phone Number
                                </th>
                                <th scope="col" className=" font-medium px-6 py-4 text-center">
                                    ACTIONS
                                </th>
                            </tr>
                        </thead>
                        {
                            users?.length > 0 
                            && 
                            <tbody className='text-sm'>
                            {
                                    users?.map((item , i) => (
                                        <tr
                                        key={item._id} 
                                        className="bg-white border-b transition duration-300 ease-in-out"
                                        >
                                        <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                            <Link 
                                            to={`/user-management/users/${item._id}`}
                                            className='text-primary underline'
                                            >
                                                {item?.firstName}
                                            </Link>
                                        </td>
                                        <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                            {item?.lastName}
                                        </td>
                                        <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                            {item?.phone}
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
                                                        <Link 
                                                        to={`/user-management/users/${item._id}`} 
                                                        className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'>
                                                            <span>View</span>
                                                        </Link>
                                                        <Link 
                                                        to={`/user-management/edit-user/${item._id}`} 
                                                        className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'>
                                                            <span>Edit User</span>
                                                        </Link>
                                                        <div className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'>
                                                            <span>Block User</span>
                                                        </div>
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
                        }
                    </table>
                    { users?.length > 0 ? '' : <ItemNotFound />}
                    </>    
            }   
            <Pagination 
            currentPage={currentPage}
            pageCount={pages}
            setPage={setCurrentPage}
            />
        </div>
    )
}

export default UsersTable;
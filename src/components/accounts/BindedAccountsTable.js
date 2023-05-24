import Pagination from 'components/global/pagination';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import useClickOutside from 'utils/clickOutside';
import usersData from 'data/users'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from 'redux/reducers/bankReducer';
import { deleteBank } from 'redux/actions/bankActions';
import { ClipLoader } from 'react-spinners';

const BindedAccountsTable = () => {
    const dispatch = useDispatch();
    const dropMenuRef = useRef(null);
    const [showDropMenu , setShowDropMenu] = useState(false);
    const [selectedMenuIndex , setSelectedMenuIndex]  = useState(0);
    
    const { banks , currentPage , pages , deleteLoading } = useSelector(state => state.bank)

    useClickOutside(dropMenuRef , () => setShowDropMenu(false));

    const deleteHandler = async (itemId) => {
        if(window.confirm('Are you sure? You want to delete this item?')){
            dispatch(deleteBank(itemId));
        }
    }

    return (
        <div className=" shadow-bg overflow-x-auto rounded-lg">
            <table className="w-full table-auto overflow-x-auto ">
                <thead className="border-b text-sm">
                    <tr className='bg-gradient text-white'>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            User Name
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Bank Name
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Account Holder
                        </th>
                        <th scope="col" className=" font-medium px-6 py-4 text-left">
                            Account Number
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
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.user?.firstName + " " + item?.user?.lastName}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.bankName}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.accountHolder}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                {item?.accountNo}
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
                                            to={`/accounts/binded-accounts/edit/${item?._id}`} 
                                            className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'>
                                                <span>Edit</span>
                                            </Link>
                                            <div className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'
                                            onClick={() => deleteHandler(item?._id)}
                                            >
                                                <span>
                                                    {
                                                        deleteLoading
                                                        ? 
                                                            <ClipLoader size={15} />
                                                        : 
                                                            'Delete'
                                                    }
                                                </span>
                                            </div>
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

export default BindedAccountsTable;
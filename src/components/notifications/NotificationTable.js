import Pagination from 'components/global/pagination';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import useClickOutside from 'utils/clickOutside';
import usersData from 'data/users'
import RichEditor from 'components/global/RichEditor';
import RequestStatus from 'components/global/RequestStatus';
import { useQuery } from 'react-query';
import fetcher from 'utils/fetcher';
import { useSelector } from 'react-redux';
import Loader from 'components/global/Loader';
import ItemNotFound from 'components/global/ItemNotFound';
import moment from 'moment';
import Axios from 'config/api';
import { toast } from 'react-toastify';
import toastError from 'utils/toastError';
import { ClipLoader } from 'react-spinners';

const NotificationTable = () => {
    const dropMenuRef = useRef(null);
    const [showDropMenu , setShowDropMenu] = useState(false);
    const [selectedMenuIndex , setSelectedMenuIndex]  = useState(0);
    const [notifications ,setNotifications] = useState([]);
    const [currentPage , setCurrentPage] = useState(1);
    const [pages , setPages] = useState(0);
    const { user } = useSelector(state => state.auth);
    const [deleteLoading , setDeleteLoading] = useState(false);

    const queryKey = ['fetch-notifications' , currentPage];
    const { isLoading , data } = useQuery(queryKey , () => fetcher('/notification' , user))

    useEffect(() => {
        if(data) {
            setNotifications(data?.data?.data?.docs);
            setCurrentPage(data?.data?.data?.page);
            setPages(data?.data?.data?.pages);
        }
    }, [data])

    useClickOutside(dropMenuRef , () => setShowDropMenu(false));

    const deleteNotificationHandler = async id => {
        if(window.confirm('Are you sure? You want to delete this notification?')){
            try {
                setDeleteLoading(true);
                const { data : { data : { message } } } = await Axios.delete(`/notification/${id}` , {
                    headers : {
                        Authorization : `Bearer ${user?.token}`
                    }
                });
                toast.success(message);
                setShowDropMenu(false);
                setDeleteLoading(false);
                setNotifications(prev => prev.filter(i => i._id !== id ))
            } catch (error) {
                setDeleteLoading(false);
                toastError(error);
                
            }
        }
    }

    return (
        isLoading
        ? 
            <Loader />
        : 
        notifications?.length > 0
        ? 
            <div className=" shadow-bg overflow-x-auto rounded-lg">
                <table className="w-full table-auto overflow-x-auto ">
                    <thead className="border-b text-sm">
                        <tr className='bg-gradient text-white'>
                            <th scope="col" className=" font-medium px-6 py-4 text-left">
                                Title
                            </th>                        
                            <th scope="col" className=" font-medium px-6 py-4 text-center">
                                Description
                            </th>
                            <th scope="col" className=" font-medium px-6 py-4 text-center">
                                Date
                            </th>
                            <th scope="col" className=" font-medium px-6 py-4 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-sm'>
                    {
                            notifications?.map((item , i) => (
                                <tr
                                key={item._id} 
                                className="bg-white border-b transition duration-300 ease-in-out"
                                >
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                    {item?.title}
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                    {item?.description?.length > 50 ? item?.description?.slice(0,20) + '...' : item?.description}
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                    {moment(item?.createdAt).format('DD MMM YYYY hh:mm a')}
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
                                                <Link to={`/notifications/edit-notification/${item?._id}`}
                                                className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'>
                                                    <span>Edit</span>
                                                </Link>
                                                <button 
                                                className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'
                                                onClick={() => deleteNotificationHandler(item?._id)}
                                                disabled={deleteLoading}
                                                >
                                                    {
                                                        deleteLoading
                                                        ? 
                                                            <ClipLoader size={15} />
                                                        : 
                                                            <span>Delete</span>
                                                    }
                                                </button>
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
        : 
            <ItemNotFound />
    )
}

export default NotificationTable;

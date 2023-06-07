import Pagination from 'components/global/pagination';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import useClickOutside from 'utils/clickOutside';
import usersData from 'data/users'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCompany, getAllCompanies } from 'redux/actions/companyActions';
import Loader from 'components/global/Loader';
import ItemNotFound from 'components/global/ItemNotFound';
import { setCurrentPage } from 'redux/reducers/companyReducer';
import { ClipLoader } from 'react-spinners';

const CompanyTable = () => {
    const dispatch = useDispatch();
    const dropMenuRef = useRef(null);
    const [showDropMenu , setShowDropMenu] = useState(false);
    const [selectedMenuIndex , setSelectedMenuIndex]  = useState(0);

    useClickOutside(dropMenuRef , () => setShowDropMenu(false));

    const { loading , deleteLoading , companies , currentPage , pages } = useSelector(state => state.company);

    useEffect(() => {
        dispatch(getAllCompanies());
    }, [currentPage]);

    const deleteHandler = async (id) => {
        if(window.confirm('Are you sure? You want to delete this company?')){
            await dispatch(deleteCompany(id));
            setShowDropMenu(false);
        }
    }

    return (
        <div className=" shadow-bg overflow-x-auto rounded-lg">
            {
                loading
                ? 
                    <Loader />
                : 
                companies?.length > 0 
                ? 
                    <>
                        <table className="w-full table-auto overflow-x-auto ">
                            <thead className="border-b text-sm">
                                <tr className='bg-gradient text-white'>
                                    <th scope="col" className=" font-medium px-6 py-4 text-left">
                                        Company Name
                                    </th>
                                    <th scope="col" className=" font-medium px-6 py-4 text-center ">
                                        Reg Id
                                    </th>
                                    <th scope="col" className=" font-medium px-6 py-4 text-center">
                                        Location
                                    </th>
                                    <th scope="col" className=" font-medium px-6 py-4 text-center">
                                        Owner
                                    </th>
                                    <th scope="col" className=" font-medium px-6 py-4 text-center">
                                        Since
                                    </th>
                                    <th scope="col" className=" font-medium px-6 py-4 text-center">
                                        Annual Turnover
                                    </th>
                                    <th scope="col" className=" font-medium px-6 py-4 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='text-sm'>
                            {
                                    companies?.map((item , i) => (
                                        <tr
                                        key={item._id} 
                                        className="bg-white border-b transition duration-300 ease-in-out"
                                        >
                                        <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                            {item?.name}
                                        </td>
                                        <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                            {item?.registrationId}
                                        </td>
                                        <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                            {item?.location}
                                        </td>
                                        <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                            {item?.owner}
                                        </td>
                                        <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                            {item?.since}
                                        </td>
                                        <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center font-semibold">
                                            {item?.annualTurnover}
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
                                                        <Link to={`/companies/edit/${item?._id}`}
                                                        className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'>
                                                            <span>Edit</span>
                                                        </Link>
                                                        <div className='py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1'
                                                        onClick={() => {
                                                            deleteHandler(item?._id)
                                                        }}
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
                    </>
                :
                    <ItemNotFound />
            }
        </div>
    )
}

export default CompanyTable;
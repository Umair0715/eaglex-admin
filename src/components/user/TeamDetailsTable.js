import Pagination from 'components/global/pagination';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import useClickOutside from 'utils/clickOutside';
import users from 'data/users'
import { useQuery } from 'react-query';
import fetcher from 'utils/fetcher';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Loader from 'components/global/Loader';
import ItemNotFound from 'components/global/ItemNotFound';

const TeamDetailsTable = ({ userDetails }) => {
    const { id } = useParams();
    const [members , setMembers] = useState([]);
    const [level , setLevel] = useState(null);
    const [teamDetails , setTeamDetails] = useState('');

    const { user } = useSelector(state => state.auth);

    const queryKey = ['fetch-team' , level , id ]
    const { data , isLoading } = useQuery(queryKey , () => {
        return fetcher(`/user/team/${id}?level=${level}` , user)
    });

    useEffect(() => {
        window.scrollTo(0,0);
    }, [id]);

    useEffect(() => {
        if(data) {
            setMembers(data?.data?.data?.teamMembers);
            setTeamDetails(data?.data?.data);
        }
    } , [data]);



    return (
        <div>
            <div className='flex items-center justify-between gap-4'>
                <h3 className="heading-sm">Team Details</h3>
                <div>
                    <select 
                    className='sm:w-[200px] w-[100px] py-1.5 px-3 border border-dark rounded-full'
                    onChange={(e) => setLevel(e.target.value) }
                    >
                        <option value={null}>All Levels</option>
                        <option value={1}>Level 1</option>
                        <option value={2}>Level 2</option>
                        <option value={3}>Level 3</option>
                    </select>
                </div>
            </div>
            <div className='shadow-bg p-3 rounded-md mt-4 text-dark flex flex-col gap-2'>
                <div className='border-b pb-2'>
                    <div className='flex items-center justify-between gap-4 '>
                        <div>
                            Level One Members : {teamDetails?.levelOneMembersCount}
                        </div>
                        <div>
                            Total Deposit : {teamDetails?.levelOneMembersDeposit?.toFixed(1)}
                        </div>
                    </div>
                    <div className='mt-2'>
                        Level One Commission : {teamDetails?.levelOneCommission}
                    </div>
                </div>
                <div className="border-b pb-2">
                    <div className='flex items-center justify-between gap-4 '>
                        <div>
                            Level Two Members : {teamDetails?.levelTwoMembersCount}
                        </div>
                        <div>
                            Total Deposit : {teamDetails?.levelTwoMembersDeposit?.toFixed(1)}
                        </div>
                    </div>
                    <div className='mt-2'>
                        Level Two Commission : {teamDetails?.levelTwoCommission}
                    </div>
                </div>
                
                <div className="border-b pb-2">
                    <div className='flex items-center justify-between gap-4 '>
                        <div>
                            Level Three Members : {teamDetails?.levelThreeMembersCount}
                        </div>
                        <div>
                            Total Deposit : {teamDetails?.levelThreeMembersDeposit?.toFixed(1)}
                        </div>
                    </div>
                    <div className='mt-2'>
                        Level Three Commission : {teamDetails?.levelThreeCommission}
                    </div>
                </div>
                
                <div className='font-medium'>
                    <div className=''>
                        Total Team Deposit : {teamDetails?.totalTeamDeposit?.toFixed(1)}
                    </div>
                    <div className=''>
                        Total Team Invest : {Math.round(teamDetails?.totalTeamInvestment) || 0}
                    </div>
                    <div className=''>
                        Total Team Commission : {Math.round(teamDetails?.totalTeamCommission) || 0}
                    </div>
                    <div className=''>
                        User Extra Commission : {userDetails?.extraCommission || 0}
                    </div>
                    <div className=''>
                        Re-invest Commission : {userDetails?.reInvestCommission || 0}
                    </div>
                    <div className=''>
                        Team Commission + Extra Commission + Re-invest Commission : {Math.round(Number(teamDetails?.totalTeamCommission) + Number(userDetails?.extraCommission) + Number(userDetails?.reInvestCommission) ) || 0}
                    </div>
                </div>
            </div>
            
            {
                isLoading
                ? 
                    <Loader />
                : 
                members?.length > 0 
                ? 
                    <div className='mt-4'>
                    <div className=" shadow-bg overflow-x-auto rounded-lg">
                        <table className="w-full table-auto overflow-x-auto ">
                            
                            <thead className="border-b text-sm">
                                <tr className='bg-gradient text-white'>
                                    <th scope="col" className=" font-medium px-6 py-4 text-left">
                                        Full Name
                                    </th>
                                    <th scope="col" className=" font-medium px-6 py-4 text-left">
                                        Phone Number
                                    </th>
                                    <th scope="col" className=" font-medium px-6 py-4 text-left">
                                        Joined
                                    </th>
                                    <th scope="col" className=" font-medium px-6 py-4 text-center">
                                        Total Deposit
                                    </th>
                                    <th scope="col" className=" font-medium px-6 py-4 text-center">
                                        Team Level
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='text-sm'>
                                {
                                    members?.map((item , i) => (
                                        <tr
                                        key={item._id} 
                                        className="bg-white border-b transition duration-300 ease-in-out"
                                        >
                                        <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                            <Link 
                                            to={`/user-management/users/${item?._id}`}
                                            className='underline text-primary'
                                            >
                                            {item?.firstName + ' ' + item?.lastName}
                                            </Link>
                                        </td>
                                        <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                            {item?.phone}
                                        </td>
                                        <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                                            {moment(item?.createdAt).format('DD MMM YYYY')}
                                        </td>
                                        <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                            {item?.totalDepositAmount?.toFixed(2) || 0}
                                        </td>
                                        <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                            {item?.level}
                                        </td>
                                    </tr>
                                    ))
                            }
                            
                            </tbody>
                        </table>
                    </div>
                    </div>
                : 
                    <ItemNotFound message='Not team member found.' />
            }
        </div>

    )
}

export default TeamDetailsTable;
import BackBtn from 'components/global/BackBtn'
import Input from 'components/global/Input';
import Layout from 'components/global/Layout';
import Loader from 'components/global/Loader';
import RequestStatus from 'components/global/RequestStatus';
import DepositsTable from 'components/user/DepositsTable';
import InvestsTable from 'components/user/InvestsTable';
import TeamDetailsTable from 'components/user/TeamDetailsTable';
import UserNote from 'components/user/UserNote';
import UserWithdrawDetails from 'components/user/WithdrawDetails';
import Axios, { baseURL } from 'config/api';
import users from 'data/users';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import fetcher from 'utils/fetcher';
import toastError from 'utils/toastError';

const UserDetails = () => {
    const { id } = useParams();
    const { user } = useSelector(state => state.auth);
    const [userDetails , setUserDetails] = useState('');
    const [balance , setBalance] = useState(0);
    const [walletLoading , setWalletLoading] = useState(false);
    const [blockLoading , setBlockLoading] = useState(false);

    const { data : userData , isLoading : userLoading } = useQuery(['fetch-user-details' , id] , () => {
        return fetcher(`/user/details/${id}` , user)
    });
    

    useEffect(() => {
        if (userData) {
            setUserDetails(userData?.data?.data?.doc);
            setBalance(Math.round(userData?.data?.data?.doc?.wallet?.totalBalance))
        }
    }, [userData])


    const handleWalletSubmit = async e => {
        e.preventDefault();
        if(userDetails?.wallet?.totalBalance === balance) {
            return toast.info("you haven't made any changes.")
        }
        if(window.confirm('Are you sure? You want to update wallet balance?')) {
            try {
                setWalletLoading(true);
                const { data : { data : { doc , message } } } = await Axios.put(`/wallet/update-balance/${userDetails?.wallet?._id}` , { totalBalance : balance } , {
                    headers : {
                        Authorization : `Bearer ${user?.token}`
                    }
                });
                toast.success(message);
                setUserDetails(prev => ({...prev , isActive : doc?.isActive }));
                setWalletLoading(false);
            } catch (error) {
                setWalletLoading(false);
                toastError(error);
            }
        }
    }


    const blockUserHandler = async (status) => {
        if(window.confirm(`Are you sure? You want to ${status} this user?`)){
            try {
                setBlockLoading(true);
                const { data : { data : { message , doc } } } = await Axios.put(`/user/block/${id}` , 
                { isActive : status === 'block' ? false : true } 
                , {
                    headers : {
                        Authorization : `Bearer ${user?.token}`
                    }
                });
                toast.success(message);
                setUserDetails(() => ({...doc}));
                setBlockLoading(false);
            } catch (error) {
                setBlockLoading(false);
                toastError(error);
            }
        }
    }

    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between gap-4 sm:flex-row flex-col">
                    <BackBtn />
                    <div className='flex items-center gap-2'>
                        
                        <div>
                            <RequestStatus status={userDetails?.isActive ? 'active' : "blocked"} />
                        </div>
                        {
                            userDetails?.isActive
                            ?
                                <button 
                                className={`btn-primary py-1 5 px-4`}
                                onClick={() => {
                                    blockUserHandler('block')
                                }}
                                disabled={blockLoading}
                                >
                                    {
                                        blockLoading
                                        ? 
                                            <ClipLoader size={15} color='white' />
                                        : 
                                            'Block User'
                                    }
                                </button>
                            : 
                                <button 
                                className={`btn-primary py-1 5 px-4`}
                                onClick={() => {
                                    blockUserHandler('unblock')
                                }}
                                disabled={blockLoading}
                                >
                                    {
                                        blockLoading
                                        ? 
                                            <ClipLoader size={15} color='white' />
                                        : 
                                            'Unblock User'
                                    }
                                </button>
                                    
                        }
                    </div>
                </div>
                <div className=''>
                    {
                        userLoading
                        ? 
                            <Loader />
                        : 
                        <div className='bg-gradientHover rounded-lg py-5 mt-4 text-white flex flex-col items-center justify-center gap-4'>
                            <img 
                            src={baseURL + userDetails?.image} 
                            alt={userDetails?.firstName} 
                            className='w-[100px] h-[100px] rounded-full object-cover'
                            />
                            <div className='text-center text-pure'>
                                <h4>
                                    {
                                        userDetails?.firstName + " " + userDetails?.lastName
                                    }
                                </h4>
                                <p>{userDetails?.phone}</p>
                                
                                <p>Profit Earned : {Math.round(userDetails?.totalProfit) || 0}</p>
                                <p>Joined : {moment(userDetails?.createdAt).format('DD MMM YYYY hh:mm a')}</p>
                            </div>
                        </div>
                    }
                    <UserNote 
                    userDetails={userDetails} 
                    setUserDetails={setUserDetails} 
                    />
                    <div className='mt-8 shadow-bg'>
                        <div className="bg-gradient py-2 text-white text-center rounded-lg">
                            <h3 className='text-lg font-semibold text-white'>Wallet Details</h3>
                        </div>
                        <form className='p-4' onSubmit={handleWalletSubmit}>
                            <Input
                            type='number'
                            label='Wallet Balance'
                            value={balance || 0}
                            setValue={setBalance}
                            min={0}
                            />
                            <div className='mt-6'>
                                <button className="btn-primary py-1.5 px-10">
                                    {
                                        walletLoading
                                        ? 
                                            <ClipLoader 
                                            size={20} 
                                            color='white' 
                                            />
                                        : 
                                            'Save'
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className='mt-8'>
                        <div className="flex items-center justify-between">
                            <h3 className='heading-sm'>Invests</h3>
                            <p>Total Invested : {userDetails?.totalInvestAmount}</p>
                        </div>
                        <div className='mt-4'>
                            <InvestsTable />
                        </div>
                    </div>
                    <div className='mt-8'>
                        <div className="flex items-center justify-between gap-2">
                            <h3 className='heading-sm'>Deposits</h3>
                            <p>
                                Total Deposited : {userDetails?.totalDepositAmount}
                            </p>
                        </div>
                        <div className='mt-4'>
                            <DepositsTable />
                        </div>
                    </div>

                    <div className='mt-8'>
                        <div className='mt-4'>
                            <UserWithdrawDetails />
                        </div>
                    </div>
                    <div className='mt-12'>                       
                        <TeamDetailsTable userDetails={userDetails} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserDetails
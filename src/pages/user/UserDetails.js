import BackBtn from 'components/global/BackBtn'
import Layout from 'components/global/Layout';
import Loader from 'components/global/Loader';
import DepositsTable from 'components/user/DepositsTable';
import InvestsTable from 'components/user/InvestsTable';
import TeamDetailsTable from 'components/user/TeamDetailsTable';
import { baseURL } from 'config/api';
import users from 'data/users';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import fetcher from 'utils/fetcher';

const UserDetails = () => {
    const { id } = useParams();
    const { user } = useSelector(state => state.auth);
    const [userDetails , setUserDetails] = useState('');
    
    console.log({ id })

    const { data : userData , isLoading : userLoading } = useQuery('fetch-user-details' , () => {
        return fetcher(`/user/details/${id}` , user)
    });
    

    useEffect(() => {
        if (userData) {
            setUserDetails(userData?.data?.data?.doc);
        }
    }, [userData])

   


    return (
        <Layout>
            <div>
                <BackBtn />
                <div className=''>
                    {
                        userLoading
                        ? 
                            <Loader />
                        : 
                        <div className='bg-gradientHover rounded-lg py-5 mt-4 text-white flex flex-col items-center justify-center gap-4'>
                            <img 
                            src={baseURL + '/user/' + userDetails?.image} 
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
                            </div>
                        </div>
                    }
                    <div className='mt-8'>
                        <h3 className='heading-sm'>Invests</h3>
                        <div className='mt-4'>
                            <InvestsTable />
                        </div>
                    </div>
                    <div className='mt-8'>
                        <h3 className='heading-sm'>Deposits</h3>
                        <div className='mt-4'>
                            <DepositsTable />
                        </div>
                    </div>
                    <div className='mt-12'>                       
                        <TeamDetailsTable />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserDetails
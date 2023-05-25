import Cards from 'components/dashboard/Cards';
import RecentlyInvested from 'components/dashboard/RecentlyInvested';
import TopCustomers from 'components/dashboard/TopCustomers';
import Heading from 'components/global/Heading';
import Layout from 'components/global/Layout';
import Loader from 'components/global/Loader';
import UsersTable from 'components/user/UsersTable';
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import fetcher from 'utils/fetcher';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats , setStats] = useState('');
    const { user } = useSelector(state => state.auth)

    const { isLoading , data } = useQuery('fetch-dashboard-stats' , () => {
        return fetcher(`/admin/dashboard-stats` , user);
    });

    useEffect(() => {
        if(!user) {
            navigate('/login');
        }
    }, [])
    
    useEffect(() => {
        if(data) {
            setStats(data?.data?.data);
        }
    }, [data]);

    console.log(stats)

    return (
        <Layout>
            {
                isLoading
                ? 
                    <Loader />
                : 
                    <div className='flex flex-col gap-8'>
                        <h1 className='text-2xl font-semibold text-gray-500'>Welcome Back Admin</h1>
                        <div>
                            <Cards stats={stats} />
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <Heading 
                                title='Recently Invested' 
                                showIcon={false} 
                                />
                                <Link 
                                to='/investments' 
                                className='cursor-pointer text-primary text-[15px] underline'
                                >
                                    View All 
                                </Link>
                            </div>
                            <div className='mt-2'>
                                <RecentlyInvested stats={stats} />
                            </div>
                        </div>
                        {/* <div>
                            <TopCustomers />
                        </div> */}
                    </div>
            }
        </Layout>
    )
}

export default Dashboard
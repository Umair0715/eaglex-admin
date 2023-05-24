import BackBtn from 'components/global/BackBtn'
import Layout from 'components/global/Layout';
import DepositsTable from 'components/user/DepositsTable';
import TeamDetailsTable from 'components/user/TeamDetailsTable';
import users from 'data/users';
import { useState } from 'react';

const UserDetails = () => {
    const [user , setUser] = useState(users[0]);

    return (
        <Layout>
            <div>
                <BackBtn />
                <div className=''>
                    <div className='bg-gradientHover rounded-lg py-5 mt-4 text-white flex flex-col items-center justify-center gap-4'>
                        <img 
                        src={user?.img} 
                        alt={user.name} 
                        className='w-[100px] h-[100px] rounded-full object-cover'
                        />
                        <div className='text-center text-pure'>
                            <h4>{user.name}</h4>
                            <p>{user.email}</p>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <h3 className='heading-sm'>Deposits</h3>
                        <div className='mt-4'>
                            <DepositsTable />
                        </div>
                    </div>
                    <div className='mt-12'>
                        <div className='flex items-center justify-between gap-4'>
                            <h3 className="heading-sm">Team Details</h3>
                            <div>
                                <select className='sm:w-[200px] w-[100px] py-1.5 px-3 border border-dark rounded-full'>
                                    <option value="all">All Levels</option>
                                    <option value="all">Level 1</option>
                                    <option value="all">Level 2</option>
                                    <option value="all">Level 3</option>
                                </select>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <TeamDetailsTable />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserDetails
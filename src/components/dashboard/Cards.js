import { Link } from 'react-router-dom';
import EarningImg from 'assets/images/earning.png';
import ScreensImg from 'assets/images/screens.png';
import BookingsImg from 'assets/images/bookings.png';
import CategoryImg from 'assets/images/cat.png';
import shortNumberFormat from 'utils/ShortNumberFormat';

const Cards = ({ stats }) => {
    return (
        <div>
            <div className='grid  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3'>
                <div className='rounded-[2rem] bg-gradient text-white flex py-4 px-6 relative'>
                    <div className='flex-1 flex flex-col justify-between'>
                        <p>Total Invested</p>
                        <h3 className='text-3xl font-semibold mb-4'>
                            {shortNumberFormat(stats?.totalInvestedAmount)}
                        </h3>
                        <Link to='/investments' className='underline text-sm'>
                            View Entire list    
                        </Link>           
                    </div>
                    <div className='flex-1'>
                        <img 
                        src={EarningImg} 
                        alt="Total Earnings"
                        className='w-full h-full object-cover' 
                        />
                    </div>
                </div>
               
                <div className='rounded-[2rem] bg-gradientHover text-white flex py-4 px-6 relative'>
                    
                    <div className='flex-1 flex flex-col justify-between'>
                        <p>Total Users</p>
                        <h3 className='text-3xl font-semibold'>
                            {shortNumberFormat(stats?.totalUsers)}
                        </h3>
                        <Link to='/user-management/users' className='underline text-sm'>
                            View Entire list    
                        </Link>           
                    </div>
                    <div className='flex-1 flex items-end justify-end'>
                        <img 
                        src={BookingsImg} 
                        alt="Total Earnings"
                        className='w-[100px] h-full object-cover' 
                        />
                    </div>
                </div>
                <div className='rounded-[2rem] bg-gradient text-white flex py-4 px-6 relative'>
                    
                    <div className='flex-1 flex flex-col justify-between'>
                        <p>Today Invested</p>
                        <h3 className='text-3xl font-semibold'>
                            {shortNumberFormat(stats?.todayInvestedAmount)}
                        </h3>
                        <Link to='/investments' className='underline text-sm'>
                            View Entire list    
                        </Link>           
                    </div>
                    <div className='flex-1 flex items-end justify-end'>
                        <img 
                        src={CategoryImg} 
                        alt="Total Categories"
                        className='w-[100px] h-full object-cover' 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards
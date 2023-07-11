import { Link } from 'react-router-dom';
import EarningImg from 'assets/images/earning.png';
import ScreensImg from 'assets/images/screens.png';
import BookingsImg from 'assets/images/bookings.png';
import CategoryImg from 'assets/images/cat.png';
import shortNumberFormat from 'utils/ShortNumberFormat';

const Cards = ({ stats }) => {
    function formatLargeNumber(number) {
        if(!number) return 0;
        const suffixes = ['', 'K', 'M', 'B', 'T'];
        const magnitude = Math.floor(Math.log10(number) / 3);
        const scaledNumber = number / Math.pow(10, magnitude * 3);
        const formattedNumber = scaledNumber.toFixed(1);
      
        return formattedNumber + suffixes[magnitude];
    }
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
            <div className='mt-6'>
                {/* <h1 className='text-xl font-semibold '>Deposit Stats</h1> */}
                <div className='grid  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 mt-2'>
                    <div className='shadow-bg rounded-md p-4 flex flex-col gap-1 items-center hover:shadow-lg'>
                        <p className='font-bold text-3xl gradient-text'>
                            {formatLargeNumber(stats?.totalApprovedDepositAmount)}
                        </p>
                        <h3 className='font-semibold '>Total Approved Deposit</h3>
                        <h6 className='text-sm font-semibold mt-4'>Total Requests : {stats?.totalApprovedDepositsCount}</h6>
                    </div>

                    <div className='shadow-bg rounded-md p-4 flex flex-col gap-1 items-center hover:shadow-lg'>
                        <p className='font-bold text-3xl gradient-text'>
                            {formatLargeNumber(stats?.todayApprovedDepositAmount)}
                        </p>
                        <h3 className='font-semibold '>Today Approved Deposit</h3>
                        <h6 className='text-sm font-semibold mt-4'>Total Requests : {stats?.todayApprovedDepositsCount}</h6>
                    </div>
                    

                    <div className='shadow-bg rounded-md p-4 flex flex-col gap-1 items-center hover:shadow-lg'>
                        <p className='font-bold text-3xl gradient-text'>
                            {formatLargeNumber(stats?.todayPendingDepositAmount)}
                        </p>
                        <h3 className='font-semibold '>Today Pending Deposit</h3>
                        <h6 className='text-sm font-semibold mt-4'>Total Requests : {stats?.todayPendingDepositsCount}</h6>
                    </div>
                    {/* <div className='shadow-bg rounded-md p-4 flex flex-col gap-1 items-center'>
                        <p className='font-bold text-3xl gradient-text'>
                            {formatLargeNumber(stats?.todayTotalDepositAmount)}
                        </p>
                        <h3 className='font-semibold '>Today Total Deposit</h3>
                    </div> */}
                </div>
             
            </div>
            <div className='mt-6'>
                {/* <h1 className='text-xl font-semibold '>Withdraw Stats</h1> */}
                <div className='grid  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 mt-2'>
                    <div className='shadow-bg rounded-md p-4 flex flex-col gap-1 items-center hover:shadow-lg'>
                        <p className='font-bold text-3xl gradient-text'>
                            {formatLargeNumber(stats?.totalApprovedWithdrawAmount)}
                        </p>
                        <h3 className='font-semibold '>Total Approved Withdraw</h3>
                        <h6 className='text-sm font-semibold mt-4'>Total Requests : {stats?.totalApprovedWithdrawCount}</h6>
                    </div>

                    <div className='shadow-bg rounded-md p-4 flex flex-col gap-1 items-center hover:shadow-lg'>
                        <p className='font-bold text-3xl gradient-text'>
                            {formatLargeNumber(stats?.todayApprovedWithdrawAmount)}
                        </p>
                        <h3 className='font-semibold '>Today Approved Withdraw</h3>
                        <h6 className='text-sm font-semibold mt-4'>Total Requests : {stats?.todayApprovedWithdrawCount}</h6>
                    </div>

                    <div className='shadow-bg rounded-md p-4 flex flex-col gap-1 items-center hover:shadow-lg'>
                        <p className='font-bold text-3xl gradient-text'>
                            {formatLargeNumber(stats?.todayPendingWithdrawAmount)}
                        </p>
                        <h3 className='font-semibold '>Today Pending Withdraw</h3>
                        <h6 className='text-sm font-semibold mt-4'>Total Requests : {stats?.todayPendingWithdrawCount}</h6>
                    </div>

                    {/* <div className='shadow-bg rounded-md p-4 flex flex-col gap-1 items-center'>
                        <p className='font-bold text-3xl gradient-text'>
                            {formatLargeNumber(stats?.todayTotalDepositAmount)}
                        </p>
                        <h3 className='font-semibold '>Today Total Deposit</h3>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Cards
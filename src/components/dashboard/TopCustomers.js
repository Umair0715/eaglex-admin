import { topCustomers } from 'data/topCustomers'

const TopCustomers = () => {
    return (
        <div>
            <div className='flex items-center justify-between border-b pb-2'>
                <div className='flex items-center gap-2'>
                    <i className="uil uil-users-alt text-xl"></i>
                    <h4 className='font-semibold'>Top Customers</h4>
                </div>
                <div className='text-5xl text-grayText'>
                    <i className="uil uil-user-circle"></i>
                </div>
            </div>
            <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6 py-8'>
                {
                    topCustomers?.slice(0,9).map((item , i) => (
                        <div 
                        className='border-2 rounded-lg py-2 px-4 flex flex-col gap-4' 
                        key={i}
                        >
                            <div className='bg-gradient w-fit text-pure rounded-md py-1 px-4 text-[10px]'>Orders {item?.orders}</div>
                            <div className='w-[60px] h-[60px] mx-auto'>
                                <img src={item?.img} alt={item?.name} className='w-full h-full object-cover rounded-full border border-grayText'/>
                            </div>
                            <div className='text-center text-sm text-grayText'>
                                {item?.name}
                            </div>
                            
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default TopCustomers
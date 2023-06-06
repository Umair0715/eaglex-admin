import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'
import Loader from 'components/global/Loader'
import RequestStatus from 'components/global/RequestStatus'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getInvestDetails } from 'redux/actions/investActions'

const InvestDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { loading , investDetails : item } = useSelector(state => state.invest); 

    useEffect(() => {
        dispatch(getInvestDetails(id));
    }, [dispatch]);
    

    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between gap-4'>
                    <Heading title='Invest Details' showIcon={false} />
                    <BackBtn />
                </div>
                {
                    loading 
                    ? 
                        <Loader />
                    : 
                        <div className='mt-6'>
                            <div className='shadow-bg p-4'>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>First Name</h6>
                                        {
                                            item?.user 
                                            ? 
                                            <p className='text-primary'>{item?.user?.firstName}</p>
                                            : 
                                            <p className='text-red-500'>Deleted User</p>
                                        }
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Last Name</h6>
                                        {
                                            item?.user 
                                            ? 
                                            <p className='text-primary'>{item?.user?.firstName}</p>
                                            : 
                                            <p className='text-red-500'>Deleted User</p>
                                        }
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Phone No</h6>
                                        <p className='text-primary'>
                                            {item?.user?.phone || '//'}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Invested Amount</h6>
                                        <p className='text-primary'>
                                            {item?.amount}
                                        </p>
                                    </div>
                                    
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Progress</h6>
                                        <p className='text-primary'>
                                            {item?.progress?.toFixed(2)}%
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Offer Name</h6>
                                        <p className='text-primary'>
                                            {item?.offer?.name}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>
                                            Profit In %
                                        </h6>
                                        <p className='text-primary'>
                                            {item?.offerProfit}%
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>
                                            Profit In Amount
                                        </h6>
                                        <p className='text-primary'>
                                            {item?.returnProfitAmount}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Total Profit Return in %</h6>
                                        <p className='text-primary'>
                                            {item?.totalProfitReturnInPer}%
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Total Profit Return in Amount</h6>
                                        <p className='text-primary'>
                                            {item?.totalProfitReturnInAmount}   
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Start Date</h6>
                                        <p className='text-primary'>
                                            {moment(item?.startDate).format('DD MMM YYYY hh:mm a')}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>End Date</h6>
                                        <p className='text-primary'>
                                            {moment(item?.endDate).format('DD MMM YYYY hh:mm a')}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Status</h6>
                                        <p className='text-primary'>
                                            <RequestStatus status={item?.status} />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                }
            </div>
        </Layout>
    )
}

export default InvestDetails
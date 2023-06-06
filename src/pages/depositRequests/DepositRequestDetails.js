import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Input from 'components/global/Input'
import Layout from 'components/global/Layout'
import Loader from 'components/global/Loader'
import SelectBox from 'components/global/SelectBox'
import TextArea from 'components/global/TextArea'
import { baseURL } from 'config/api'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { editDeposit, getDepositDetails } from 'redux/actions/depositActions'

const DepositRequestDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [status , setStatus] = useState('');
    const [transferAmount , setTransferAmount] = useState('');
    const [description , setDescription] = useState('');

    const { loading , depositDetails : item , updateLoading } = useSelector(state => state.deposit); 

    useEffect(() => {
        dispatch(getDepositDetails(id));
    }, [dispatch]);

    useEffect(()=> {
        if(item) {
            setStatus(item?.status);
            setDescription(item?.description)
            setTransferAmount(item?.transferAmount)
        }
    }, [item]);

    const updateHandler = async () => {
        const data = { description , status };
        if(status === 'approved') {
            data.transferAmount = Number(transferAmount);
        }
        await dispatch(editDeposit(id , data));
        setTransferAmount('');
    }
    

    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between gap-4'>
                    <Heading title='Deposit Details' showIcon={false} />
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
                                        <p 
                                        className={item?.user ? 'text-primary' : 'text-red-500'}>
                                            {item?.user?.firstName || 'Deleted User'}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Last Name</h6>
                                        <p className={item?.user ? 'text-primary' : 'text-red-500'}>
                                            {item?.user?.lastName || 'Deleted User'}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Phone No</h6>
                                        <p className={item?.user ? 'text-primary' : 'text-red-500'}>
                                            {item?.user?.phone || '//'}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Deposit Amount</h6>
                                        <p className='text-primary'>
                                            {item?.amount}
                                        </p>
                                    </div>
                                    
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Date</h6>
                                        <p className='text-primary'>
                                            {moment(item?.createdAt).format('DD MMM YYYY hh:mm a')}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Bank Name</h6>
                                        <p className='text-primary'>
                                            {item?.bankName}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Account Holder</h6>
                                        <p className='text-primary'>
                                            {item?.accountHolder}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Account Number</h6>
                                        <p className='text-primary'>
                                            {item?.accountNo}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Request Id</h6>
                                        <p className='text-primary'>
                                            {item?._id || 'Not Defined'}
                                        </p>
                                    </div>

                                </div>
                                <div className='mt-6 '>
                                    <h3 className='font-medium sm:text-lg text-sm text-dark'>Receipt</h3>
                                    <div className='flex items-center justify-center mt-4'>
                                        <img 
                                        src={baseURL + '/' + item?.proof} 
                                        alt="Receipt" 
                                        />
                                    </div>
                                </div>
                                <div className='flex sm:flex-row flex-col gap-4 mt-6'>
                                    <div className='flex-1'>
                                        <SelectBox
                                            label='Status'
                                            options={[
                                                { label : 'Approved' , value : 'approved' } ,
                                                { label : 'Declined' , value : 'declined' } ,
                                                { label : 'Pending' , value : 'pending' } ,
                                            ]}
                                            value={status}
                                            setValue={setStatus}
                                            />



                                        {/* {
                                            item?.status === 'approved'
                                            ? 
                                                <Input 
                                                label='Status'
                                                value={status.toUpperCase()}
                                                readOnly
                                                style={{ color : 'var(--primary)'}}
                                                />
                                            : 
                                                <SelectBox
                                                label='Status'
                                                options={[
                                                    { label : 'Approved' , value : 'approved' } ,
                                                    { label : 'Declined' , value : 'declined' } ,
                                                    { label : 'Pending' , value : 'pending' } ,
                                                ]}
                                                value={status}
                                                setValue={setStatus}
                                                />
                                        } */}
                                    </div>
                                    {
                                        status !== 'declined'
                                        && 
                                        <div className='flex-1'>
                                            <Input 
                                            label='Transfer Amount'
                                            placeholder="Amount to add in user's wallet"
                                            value={transferAmount}
                                            setValue={setTransferAmount}
                                            readOnly={item?.status === 'approved'}
                                            />
                                        </div> 
                                    }
                                </div>
                                <div className='mt-4'>
                                    <TextArea
                                    placeholder='Write short description'
                                    label='Description'
                                    value={description}
                                    setValue={setDescription}
                                    />
                                </div>

                                <div 
                                className='mt-8 pb-4'
                                title={'Save Changes'}
                                >
                                    <button 
                                    className="btn-primary py-2 px-12"
                                    disabled={updateLoading}
                                    onClick={updateHandler}
                                    >
                                        {
                                            updateLoading
                                            ? 
                                                <ClipLoader size={20} color='white' />
                                            : 
                                                'Done'
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>

                }
            </div>
        </Layout>
    )
}

export default DepositRequestDetails
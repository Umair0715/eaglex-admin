import BackBtn from 'components/global/BackBtn'
import FileInput from 'components/global/FileInput'
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
import { editWithdrawRequest, getWithdrawDetails } from 'redux/actions/withdrawActions'
import isBase64 from 'utils/isBase64'

const WithdrawDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [status , setStatus] = useState('');
    const [proof , setProof] = useState();
    const [description , setDescription] = useState('');

    const { loading , requestDetails : item , updateLoading } = useSelector(state => state.withdraw); 

    useEffect(() => {
        dispatch(getWithdrawDetails(id));
    }, [dispatch]);

    useEffect(()=> {
        if(item) {
            setStatus(item?.status);
            setDescription(item?.description)
            if(item?.proof) {
                setProof(baseURL + '/' + item?.proof)
            }
        }
    }, [item]);

    const updateHandler = async () => {
        const data = { description , status };
        if(isBase64(proof)){
            data.proof = proof;
        }
        dispatch(editWithdrawRequest(id , data));
    }
    

    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between gap-4'>
                    <Heading title='Withdraw Request Details' showIcon={false} />
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
                                        <p className='text-primary'>{item?.user?.firstName}</p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Last Name</h6>
                                        <p className='text-primary'>
                                            {item?.user?.lastName}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Phone No</h6>
                                        <p className='text-primary'>
                                            {item?.user?.phone}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Withdrawal Amount</h6>
                                        <p className='text-primary'>
                                            {item?.withdrawAmount}
                                        </p>
                                    </div>
                                    
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Date</h6>
                                        <p className='text-primary'>
                                            {moment(item?.createdAt).format('DD MMM YYYY')}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Bank Name</h6>
                                        <p className='text-primary'>
                                            {item?.bankDetails?.bankName}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Account Holder</h6>
                                        <p className='text-primary'>
                                            {item?.bankDetails?.accountHolder}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Account Number</h6>
                                        <p className='text-primary'>
                                            {item?.bankDetails?.accountNo}
                                        </p>
                                    </div>

                                </div>
                                <div className='flex sm:flex-row flex-col gap-4 mt-4'>
                                    <div className='flex-1'>
                                        <SelectBox
                                        label='Status'
                                        options={[
                                            { label : 'Completed' , value : 'completed' } ,
                                            { label : 'Declined' , value : 'declined' } ,
                                            { label : 'Pending' , value : 'pending' } ,
                                        ]}
                                        value={status}
                                        setValue={setStatus}
                                        />
                                    </div>
                                    
                                </div>
                                <div className='mt-4'>
                                    <TextArea
                                    placeholder='Write short description'
                                    label='Description'
                                    value={description}
                                    setValue={setDescription}
                                    />
                                </div>
                                <div className='mt-4'>
                                    <FileInput
                                    label='Receipt Proof'
                                    value={proof}
                                    setValue={setProof}
                                    height='auto'
                                    />
                                </div>

                                <div 
                                className='mt-8 pb-4'
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

export default WithdrawDetails
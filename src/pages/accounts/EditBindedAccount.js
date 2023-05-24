import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Input from 'components/global/Input'
import Layout from 'components/global/Layout'
import Loader from 'components/global/Loader'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { editBank, getBankDetails } from 'redux/actions/bankActions'

const EditBindedAccount = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [bankName , setBankName] = useState('');
    const [accountHolder , setAccountHolder] = useState();
    const [accountNo , setAccountNo] = useState('');

    const { loading , bankDetails : item , updateLoading } = useSelector(state => state.bank); 

    useEffect(() => {
        dispatch(getBankDetails(id));
    }, [dispatch]);

    useEffect(()=> {
        if(item) {
            setBankName(item?.bankName);
            setAccountHolder(item?.accountHolder);
            setAccountNo(item?.accountNo);
        }
    }, [item]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { bankName , accountHolder , accountNo };
        dispatch(editBank(id , data));
    }


    return (
        <Layout>
            <div className='flex items-center justify-between'>
                <Heading title='Edit Withdrawl Account' icon='pen' />
                <BackBtn />
            </div>
            {
                loading 
                ? 
                    <Loader />
                : 
                    <div className='mt-6 shadow-bg p-4'>
                        <form 
                        className='flex flex-col gap-4'
                        onSubmit={handleSubmit}
                        >
                            <div className='flex sm:flex-row flex-col items-center justify-between gap-4'>
                                <Input
                                label='Bank Name'
                                placeholder='Edit Bank Name'
                                value={bankName}
                                setValue={setBankName}
                                />
                                <Input
                                label='Account Holder'
                                placeholder='Ex : John Doe'
                                value={accountHolder}
                                setValue={setAccountHolder}
                                />
                            </div>
                            <div>
                                <Input
                                label='Account Number'
                                placeholder='Edit Account Number'
                                value={accountNo}
                                setValue={setAccountNo}
                                />
                            </div>
                            <div className='mt-4'>
                                <button 
                                className="btn-primary py-2 px-12"
                                disabled={updateLoading}
                                >
                                    {
                                        updateLoading
                                        ? 
                                            <ClipLoader size={20} color='white' />
                                        : 
                                            'Save'
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
            }
        </Layout>
    )
}

export default EditBindedAccount
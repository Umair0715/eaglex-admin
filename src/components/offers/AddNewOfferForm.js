import FileInput from 'components/global/FileInput';
import Input from 'components/global/Input'
import SelectBox from 'components/global/SelectBox';
import Axios from 'config/api';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { createOffer } from 'redux/actions/offerActions';

const AddNewOfferForm = () => {
    const [name , setName] = useState('');
    const [companies , setCompanies] = useState([]);
    const [company , setCompany] = useState([]);
    const [depositRange , setDepositRange] = useState('');
    const [timePeriod , setTimePeriod] = useState('');
    const [active , setActive] = useState('');
    const [status , setStatus] = useState('');
    const [image , setImage] = useState('');
    const [profit , setProfit] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { createLoading } = useSelector(state => state.offer);

    const { data } = useQuery('fetch-companies' , () => {
        return Axios('/company/get/total');
    });

    useEffect(() => {
        if(data) {
            const { data : { data : { docs } } } = data;
            setCompanies(docs);
        }
    }, [data ]);

    const handleSubmit = async e => {
        e.preventDefault();
        const data = { 
            name , isActive : active , status , 
            depositRange : [parseInt(depositRange.split('-')[0]) , parseInt(depositRange.split('-')[1])] ,
            timePeriod : parseInt(timePeriod) ,
            profit : parseInt(profit) ,
            image , company 
        }
        dispatch(createOffer(data , navigate));
    }

    return (
        <div className='mt-6 shadow-bg p-4 pb-8'>
            <form 
            className='flex flex-col gap-4'
            onSubmit={handleSubmit}
            >
                <div className='flex sm:flex-row flex-col items-center justify-between gap-4'>
                    <Input
                    label='Offer Name'
                    placeholder='hint : Toyota two day'
                    value={name}
                    setValue={setName}
                    required
                    />
                    <SelectBox
                    label='Company'
                    options={companies?.map(item => (
                        { label : item?.name , value : item?._id }
                    ))}
                    value={company}
                    setValue={setCompany}
                    required
                    />
                </div>
                <div className='flex sm:flex-row flex-col items-center justify-between gap-4'>
                    <Input
                    type='number'
                    label='Profit Percentage %'
                    placeholder='hint : 20'
                    value={profit}
                    setValue={setProfit}
                    required
                    />
                    <Input
                    type='number'
                    label='Time Period In Days'
                    placeholder='hint : 5'
                    value={timePeriod}
                    setValue={setTimePeriod}
                    required
                    />
                </div>
                <div className='flex sm:flex-row flex-col items-center justify-between gap-4'>
                    <SelectBox
                    label='Acitve'
                    options={[
                        { label : 'Yes' , value : true } ,
                        { label : 'No' , value : false } ,
                    ]}
                    value={active}
                    setValue={setActive}
                    required
                    />
                    <Input
                    label='Status (optional)'
                    placeholder='Enter offer status'
                    value={status}
                    setValue={setStatus}
                    />
                </div>
                <div>
                    <Input 
                    label='Deposit Range'
                    placeholder='hint : 1000-20000'
                    value={depositRange}
                    setValue={setDepositRange}
                    required
                    />
                </div>
                <div>
                    <FileInput
                    label='Image'
                    value={image}
                    setValue={setImage}
                    />
                </div>
                <div className='mt-4'>
                    <button 
                    className="btn-primary py-2 px-12"
                    disabled={createLoading}
                    >
                        {
                            createLoading
                            ? 
                                <ClipLoader size={20} color='white' />
                            : 
                            'Create Offer'
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddNewOfferForm
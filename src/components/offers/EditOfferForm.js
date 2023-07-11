import FileInput from 'components/global/FileInput';
import Input from 'components/global/Input'
import Loader from 'components/global/Loader';
import SelectBox from 'components/global/SelectBox';
import Axios, { baseURL } from 'config/api';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { createOffer, editOffer, getOfferDetails } from 'redux/actions/offerActions';
import isBase64 from 'utils/isBase64';
import toastError from 'utils/toastError';

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
    const [loading , setLoading] = useState(false);
    const [offer , setOffer] = useState('');
    const [investCount , setInvestCount] = useState(0);
    const [description , setDescription] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { updateLoading } = useSelector(state => state.offer);
    const { user } = useSelector(state => state.auth);

    const { data } = useQuery('fetch-companies' , () => {
        return Axios('/company/get/total');
    });

    const { id } = useParams();

    useEffect(() => {
        if(data) {
            const { data : { data : { docs } } } = data;
            setCompanies(docs);
        }
    }, [data ]);

    useEffect(() => {
        const fetchOffer = async () => {
            setLoading(true)
            try {
                const { data : { data : { doc } } } = await Axios(`/offer/${id}` , {
                    headers : {
                        Authorization : `Bearer ${user?.token}`
                    }
                } );
                setLoading(false)
                setName(doc?.name);
                setCompany(doc?.company?._id);
                setProfit(doc?.profit);
                setDepositRange(doc?.depositRange?.join('-'))
                setTimePeriod(doc?.timePeriod)
                setActive(doc?.isActive)
                setStatus(doc?.status);
                setImage(baseURL + doc?.image)
                setOffer(doc);
                setInvestCount(doc?.investCount)
                setDescription(doc?.description)
            } catch (err) {
                setLoading(false)
                console.log('error' , err);
                toastError(err)
            }
        }
        fetchOffer();
    } , [])


    const handleSubmit = async e => {
        e.preventDefault();
        const data = { 
            name , isActive : active , status , 
            depositRange : [parseInt(depositRange.split('-')[0]) , parseInt(depositRange.split('-')[1])] ,
            timePeriod : Number(timePeriod) ,
            profit : Number(profit) ,
            company , 
            investCount : Number(investCount) ,
            description
        }
        if(isBase64(image)) {
            data.image = image;
        }
        dispatch(editOffer(id , data , navigate));
    }

    return (
        <div className='mt-6 shadow-bg p-4 pb-8'>
            {
                loading 
                ? 
                    <Loader />
                : 
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
                            label='Status'
                            placeholder='Enter offer status'
                            value={status}
                            setValue={setStatus}
                            />
                        </div>
                        <div className='flex sm:flex-row flex-col items-center justify-between gap-4'>
                            <Input 
                            label='Deposit Range'
                            placeholder='hint : 1000-20000'
                            value={depositRange}
                            setValue={setDepositRange}
                            required
                            />
                            <Input 
                            type='number'
                            label='Invest Count'
                            placeholder='hint : 5000'
                            value={investCount}
                            setValue={setInvestCount}
                            />
                        </div>
                        <div>
                            <Input 
                            label='Description'
                            placeholder='Short note about offer'
                            value={description}
                            setValue={setDescription}
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
                            disabled={updateLoading}
                            >
                                {
                                    updateLoading
                                    ? 
                                        <ClipLoader size={20} color='white' />
                                    : 
                                    'Create Offer'
                                }
                            </button>
                        </div>
                    </form>

            }
        </div>
    )
}

export default AddNewOfferForm
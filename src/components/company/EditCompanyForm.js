import DatePicker_ from 'components/global/Datepicker';
import FileInput from 'components/global/FileInput';
import Input from 'components/global/Input'
import Loader from 'components/global/Loader';
import { baseURL } from 'config/api';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { createCompany, editCompany, getCompanyDetails } from 'redux/actions/companyActions';
import isBase64 from 'utils/isBase64';

const AddCompanyForm = () => {
    const [name , setName] = useState('');
    const [registrationId , setRegistrationId] = useState('');
    const [location , setLocation] = useState('');
    const [annualTurnover , setAnnualTurnover] = useState('');
    const [since , setSince] = useState('');
    const [owner , setOwner] = useState('');
    const [description , setDescription] = useState('');
    const [image , setImage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { updateLoading , companyDetails , loading } = useSelector(state => state.company)

    useEffect(() => {
        dispatch(getCompanyDetails(id))
    } , []);

    useEffect(() => {
        if(companyDetails){
            setName(companyDetails?.name);
            setRegistrationId(companyDetails?.registrationId);
            setLocation(companyDetails?.location);
            setOwner(companyDetails?.owner);
            setAnnualTurnover(companyDetails?.annualTurnover);
            setSince(companyDetails?.since);
            setDescription(companyDetails?.description);
            setImage(baseURL + companyDetails?.logo);
        }
    }, [companyDetails])

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { 
            name , registrationId , location , annualTurnover , since , owner , description ,
        }
        if(isBase64(image)){
            data.logo = image ;
        }
        dispatch(editCompany(id , data , navigate))
    }

    return (
        <div className='shadow-bg p-4 pb-8'>
            {
                loading 
                ? 
                    <Loader />
                : 
                    <form 
                    className='flex flex-col gap-4'
                    onSubmit={handleSubmit}
                    >
                        <div className='flex sm:flex-row flex-col items-center gap-4'>
                            <Input
                            label='Company Name'
                            placeholder='Enter company name'
                            value={name}
                            setValue={setName}
                            required
                            />
                            <Input
                            label='Registration Id (optional)'
                            placeholder='Enter registration id'
                            value={registrationId}
                            setValue={setRegistrationId}
                            />
                        </div>
                        <div className='flex sm:flex-row flex-col items-center gap-4'>
                            <Input
                            label='Location'
                            placeholder='Ex : Address , City , Country'
                            value={location}
                            setValue={setLocation}
                            required
                            />
                            <Input
                            label='Annual Turnover'
                            placeholder='EX : 20M'
                            value={annualTurnover}
                            setValue={setAnnualTurnover}
                            required
                            />
                        </div>
                        <div className='flex sm:flex-row flex-col items-center gap-4'>
                            <Input
                            label='Since'
                            placeholder='Ex : 2006 '
                            value={since}
                            setValue={setSince}
                            required
                            />
                            <Input
                            label='CEO'
                            placeholder='Enter Company CEO Name'
                            value={owner}
                            setValue={setOwner}
                            required
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold text-grayText'>Description</label>
                            <textarea
                            className='input resize-none h-[100px]'
                            placeholder='Describe company...'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            />
                        </div>
                        <div>
                            <FileInput
                            label='Company Logo' 
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
                                        'Save'
                                } 
                            </button>
                        </div>
                    </form>
            }
        </div>
    )
}

export default AddCompanyForm
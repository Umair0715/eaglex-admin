import DatePicker_ from 'components/global/Datepicker';
import FileInput from 'components/global/FileInput';
import Input from 'components/global/Input'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { createCompany } from 'redux/actions/companyActions';

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

    const { createLoading } = useSelector(state => state.company)

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { 
            name , registrationId , location , annualTurnover , since , owner , description ,
            logo : image  
        }
        dispatch(createCompany(data , navigate))
    }

    return (
        <div className='shadow-bg p-4 pb-8'>
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
                    label='Registration Id'
                    placeholder='Enter registration id'
                    value={registrationId}
                    setValue={setRegistrationId}
                    required
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
                    label='Owner Name'
                    placeholder='Enter Company Owner Name'
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
                    disabled={createLoading}
                    >
                        {
                            createLoading
                            ?
                                <ClipLoader size={20} color='white' />
                            : 
                                'Create'
                        } 
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddCompanyForm
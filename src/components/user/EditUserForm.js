import Input from 'components/global/Input'
import Loader from 'components/global/Loader';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';
import { editUser, getUserDetails } from 'redux/actions/userActions';

const EditUserForm = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [firstName , setFirstName] = useState('');
    const [lastName , setLastName] = useState('');
    const [phone , setPhone] = useState('');

    const { loading , userDetails , updateLoading } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getUserDetails(id))
    }, []);

    useEffect(() => {
        if(userDetails){
            setFirstName(userDetails?.firstName);
            setLastName(userDetails?.lastName);
            setPhone(userDetails?.phone);
        }
    }, [userDetails]);

    const submitHandler = e => {
        e.preventDefault();
        const data = { firstName , lastName }
        dispatch(editUser(id , data ));
    }

    return (
        <div className='mt-6 shadow-bg p-4'>
            {
                loading 
                ? 
                    <Loader />
                : 
                <form 
                className='flex flex-col gap-4'
                onSubmit={submitHandler}
                >
                    <div className='flex sm:flex-row flex-col items-center justify-between gap-4'>
                        <Input
                        label='First Name'
                        placeholder='Edit first name'
                        value={firstName}
                        setValue={setFirstName}
                        />
                        <Input
                        label='Last Name'
                        placeholder='Edit last name'
                        value={lastName}
                        setValue={setLastName}
                        />
                    </div>
                    <div className='flex sm:flex-row flex-col items-center justify-between gap-4'>
                        <Input
                        label='Phone Number'
                        placeholder='Edit phone number'
                        value={phone}
                        setValue={setPhone}
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

export default EditUserForm
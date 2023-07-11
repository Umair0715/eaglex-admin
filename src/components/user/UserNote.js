import Input from 'components/global/Input';
import Axios from 'config/api';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import toastError from 'utils/toastError';

const UserNote = ({ userDetails , setUserDetails }) => {
    const { user } = useSelector(state => state.auth);
    const [description , setDescription] = useState('');
    const [loading , setLoading] = useState(false);

    useEffect(() => {
        setDescription(userDetails?.description)
    }, [userDetails])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data : { data : { message , doc } } } = await Axios.put(`/user/description/${userDetails?._id}` , { description } , {
                headers : {
                    Authorization : `Bearer ${user?.token}`
                }
            });
            toast.success(message);
            setUserDetails(() => doc);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toastError(error);
        }
    }

    return (
        <div className='mt-8 shadow-bg'>
            <div className="bg-gradient py-2 text-white text-center rounded-lg">
                <h3 className='text-lg font-semibold text-white'>
                    User Description
                </h3>
            </div>
            <form className='p-4' onSubmit={handleSubmit}>
                <Input
                label='User Description'
                value={description || ''}
                setValue={setDescription}
                placeholder='Write short description about user'
                />
                <div className='mt-6'>
                    <button className="btn-primary py-1.5 px-10">
                        {
                            loading
                            ? 
                                <ClipLoader 
                                size={20} 
                                color='white' 
                                />
                            : 
                                'Save'
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserNote
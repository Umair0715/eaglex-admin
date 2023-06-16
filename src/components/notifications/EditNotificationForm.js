import Input from 'components/global/Input';
import Loader from 'components/global/Loader';
import Axios, { baseURL } from 'config/api';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import toastError from 'utils/toastError';

const EditNotificationForm = () => {
    const navigate = useNavigate();
    const [title , setTitle] = useState('');
    const [loading , setLoading] = useState(false);
    const [description , setDescription] = useState('');
    const [item , setItem] = useState('');

    const { id } = useParams();

    const queryKey = 'fetch-single-notification';
    const { isLoading , data } = useQuery(queryKey , () => Axios(`/notification/${id}`));

    useEffect(() => {
        if(data) {
            setItem(data?.data?.data?.doc);
            setTitle(data?.data?.data?.doc?.title);
            setDescription(data?.data?.data?.doc?.description);
        }
    }, [data]);


    const { user } = useSelector(state => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data : { data : { message  } } } = await Axios.put(`/notification/${id}` , { title , description } , {
                headers : {
                    Authorization : `Bearer ${user?.token}`
                }
            });
            toast.success(message);
            navigate('/notifications');
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toastError(error);
        }
    }

    return (
        <div>
            {
                isLoading
                ? 
                    <Loader />
                : 
                    <form 
                    className='flex flex-col gap-4 shadow-bg p-4'
                    onSubmit={handleSubmit}
                    >
                        <Input 
                        label="Title" 
                        placeholder="New Notification"
                        value={title}
                        setValue={setTitle}
                        />
                        <div className="flex flex-col gap-2">
                            <label className='font-semibold text-grayText '>Description</label>
                            <textarea 
                            className='input resize-none'
                            placeholder='Write here...'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={5}
                            />
                        </div>
                        <div className='mt-4'>
                            <button 
                            type='submit' 
                            className='btn-primary py-2 px-12'
                            disabled={loading}
                            >
                                {
                                    loading 
                                    ? 
                                        <ClipLoader size={20} color='white' />
                                    : 
                                        'Send'
                                }
                            </button>
                        </div>
                    </form>

            }
        </div>
    )
}

export default EditNotificationForm

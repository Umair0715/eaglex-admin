import Heading from 'components/global/Heading'
import PasswordInput from 'components/global/PasswordInput'
import Axios from 'config/api';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import toastError from 'utils/toastError';

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword , setNewPassword] = useState('');
    const [passwordConfirm , setPasswordConfirm] = useState('');
    const [loading , setLoading] = useState(false);

    const { user } = useSelector(state => state.auth);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data : { data : { message } } } = await Axios.put('/admin/update-password' , { oldPassword , newPassword , passwordConfirm } , {
                headers : {
                    Authorization : `Bearer ${user?.token}`
                }
            } );
            setOldPassword('');
            setNewPassword('');
            setPasswordConfirm('');
            toast.success(message);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log('Update password error' , err);
            toastError(err);
        }
    }

    return (
        <div>
            <Heading title='Update Password' showIcon={false} />
            <div className='shadow-bg p-4 mt-4'>
                <form 
                className='flex flex-col gap-4'
                onSubmit={submitHandler}
                >
                    <div className='flex sm:flex-row flex-col items-center gap-4'>
                        <PasswordInput 
                        label='Current Password'
                        placeholder='Enter Your Current Password'
                        value={oldPassword}
                        setValue={setOldPassword}
                        />
                        <PasswordInput
                        label='New Password'
                        placeholder='Ex : **************'
                        value={newPassword}
                        setValue={setNewPassword}
                        />
                    </div>
                    <PasswordInput
                    label='Confirm New Password'
                    placeholder='Ex : *************'
                    value={passwordConfirm}
                    setValue={setPasswordConfirm}
                    />
                        
                    <div className='mt-4 flex items-end justify-end'>
                        <button 
                        className="btn-primary py-2 px-12"
                        disabled={loading || !oldPassword || !newPassword || !passwordConfirm}
                        >
                            {
                                loading
                                ?
                                    <ClipLoader size={20} />
                                : 
                                    'Save'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdatePassword
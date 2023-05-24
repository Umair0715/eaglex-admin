import LoginBg from 'assets/images/loginBg.jpg';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from 'redux/actions/authActions';
import { PulseLoader } from 'react-spinners';



const Login = ({ setIsLoginPage }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [phone , setPhone] = useState('');
    const [password , setPassword] = useState('');
    const { loading , user } = useSelector(state => state.auth);

    const handleSubmit = e => {
        e.preventDefault();
        const data = {phone , password}
        dispatch(login( data , navigate ));
    }

    useEffect(() => {
        setIsLoginPage(true);
        return () => setIsLoginPage(false);
    }, []);

    useEffect(() => {
        if(user){
            navigate('/')
        }
    } , [user])

    return (
        <div className='w-full min-h-screen fixed top-0 left-0  flex items-center justify-center '
        >
            <div className='flex rounded-md bg-pure lg:w-[70%] w-[95%]'
            style={{
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
            }}
            >
                <div className='flex-1 sm:block hidden relative rounded-tl-md rounded-bl-md'
                    style={{
                        backgroundImage : `url(${LoginBg})` ,
                        backgroundSize : "cover" ,
                        backgroundPosition : 'center center'
                    }}
                >
                    <div className='absolute top-0 left-0 bg-purple-800 bg-opacity-20 w-full h-full'></div>
                    <div className='flex items-center justify-center h-full relative flex-col z-20'>
                        <h3 className='text-4xl text-pure font-semibold'>Hi , ADMIN</h3>
                        <p className='lg:w-[60%] w-[80%] mx-auto text-center text-gray-200 mt-4'>Please login your account to access your dashboard.</p>
                    </div>

                </div>
                <div className='flex-1'>
                    <div className=' px-6 '>
                        <div className='text-center flex flex-col gap-3 text-sm text-grayText pt-6'>
                            <h3 className='text-3xl text-dark font-semibold uppercase'>Sign In</h3>
                            <span>Sign in to an Admin Account</span>
                        </div>
                        <form className='flex flex-col gap-6 py-8' onSubmit={handleSubmit}>
                            <div className='flex flex-col gap-2'>
                                {/* <label htmlFor="email" className='text-[15px] font-medium text-dark'>Your Email</label> */}
                                <input 
                                type="number" 
                                id="number" 
                                placeholder='Your Phone no' 
                                className='border py-3 px-4 rounded-full placeholder:text-grayText placeholder:font-medium placeholder:text-[17px] outline-none focus:border-primary'
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                required
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                {/* <label htmlFor="password" className='text-[15px] font-medium text-dark'>Password</label> */}
                                <input 
                                type="password" 
                                id="password" 
                                placeholder='Your Password' 
                                className='border py-3 px-4 rounded-full placeholder:text-grayText placeholder:font-medium placeholder:text-[17px] outline-none focus:border-primary'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                />
                            </div>
                            <div className='flex items-center gap-2 text-grayText'>
                                <input id='remember' type="checkbox" />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <div>
                                <button type='submit' className='bg-primary  py-2.5 text-pure uppercase font-semibold w-full text-center rounded-full hover:bg-primaryHover' >
                                    {
                                    loading 
                                    ? 
                                        <PulseLoader size={10} color='#fff' /> 
                                    : 
                                        'Sign In'
                                    }
                                </button>
                            </div>
                        </form>
                        
                    </div>
                </div>
               

            </div>
        </div>
    )
}

export default Login
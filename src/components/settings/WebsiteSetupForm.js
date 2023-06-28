
import Heading from 'components/global/Heading';
import Input from 'components/global/Input'
import Loader from 'components/global/Loader';
import Axios from 'config/api';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import fetcher from 'utils/fetcher';
import toastError from 'utils/toastError';

const WebsiteSetupForm = () => {
    const [minWithdraw , setMinWithdraw] = useState('');
    const [platformFee , setPlatformFee] = useState('');
    const [extraCommission , setExtraCommission] = useState('');
    const [govtFee , setGovtFee] = useState('');
    const [bankName , setBankName] = useState('');
    const [accountHolder , setAccountHolder] = useState('');
    const [accountNo , setAccountNO] = useState('');
    const [levelOneProfit , setLevelOneProfit ] = useState('');
    const [levelTwoProfit , setLevelTwoProfit ] = useState('');
    const [levelThreeProfit , setLevelThreeProfit ] = useState('');
    const [updateLoading , setUpdateLoading] = useState(false);

    const { user } = useSelector(state => state.auth);

    const { isLoading , data } = useQuery('fetch-settings' , () => fetcher('/setting', user));

    const setStates = (doc) => {
        setMinWithdraw(doc?.minWithdraw);
        setPlatformFee(doc?.platformFee);
        setGovtFee(doc?.govtFee);
        setExtraCommission(doc?.extraCommission)
        setBankName(doc?.bankName);
        setAccountHolder(doc?.accountHolder);
        setAccountNO(doc?.accountNo);
        setLevelOneProfit(doc?.levelOneProfit);
        setLevelTwoProfit(doc?.levelTwoProfit);
        setLevelThreeProfit(doc?.levelThreeProfit);
    }

    useEffect(() => {
        if(data) {
            setStates(data.data.data.doc);
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setUpdateLoading(true);
            const settingsData = { 
                minWithdraw : Number(minWithdraw) ,
                platformFee : Number(platformFee) ,
                govtFee : Number(govtFee) ,
                extraCommission : Number(extraCommission) ,
                accountHolder , bankName , accountNo ,
                levelOneProfit : Number(levelOneProfit) ,
                levelTwoProfit : Number(levelTwoProfit) ,
                levelThreeProfit : Number(levelThreeProfit) ,
            }
            const { data : { data : { doc , message } } } = await Axios.post('/setting' , settingsData , {
                headers : {
                    Authorization : `Bearer ${user?.token}`
                }
            });
            toast.success(message);
            setStates(doc);
            setUpdateLoading(false);
        } catch (error) {
            setUpdateLoading(false);
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
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div className='shadow-bg p-4 pb-6'>
                            <div className=' flex sm:flex-row flex-col items-center gap-4'>
                                <Input 
                                label="Minimum Withdraw"
                                placeholder="50"
                                type='number'
                                value={minWithdraw}
                                setValue={setMinWithdraw}
                                />         
                                <Input 
                                label="Service Charges in %"
                                placeholder="2"
                                type='number'
                                value={platformFee}
                                setValue={setPlatformFee}
                                />
                            </div>
                            <div className='mt-4'>
                                <Input 
                                label="Extra Commission in %"
                                placeholder="2"
                                type='number'
                                value={extraCommission}
                                setValue={setExtraCommission}
                                />
                            </div>
                        </div>
                        <div className='mb-'>
                            <Heading title='Bank Details' showIcon={false} />
                        </div>
                        <div className='shadow-bg p-4 pb-6'>
                            <div className=' flex sm:flex-row flex-col items-center gap-4'>
                                <Input 
                                label="Bank Name"
                                placeholder="hint : meezan"
                                value={bankName}
                                setValue={setBankName}
                                />         
                                <Input 
                                label="Account Holder Name"
                                placeholder="hint : John Doe"
                                value={accountHolder}
                                setValue={setAccountHolder}
                                />
                            </div>
                            <div className='mt-4'>
                                <Input 
                                label="Account Number"
                                placeholder="hint : 03489023948023"
                                value={accountNo}
                                setValue={setAccountNO}
                                />
                            </div>
                        </div>

                        {/* Profits */}
                        <div className='mb-'>
                            <Heading title='Team Profit' showIcon={false} />
                        </div>
                        <div className='shadow-bg p-4 pb-6'>
                            <div className=' flex sm:flex-row flex-col items-center gap-4'>
                                <Input 
                                label="Level One Profit %   "
                                placeholder="hint : 5 "
                                value={levelOneProfit}
                                setValue={setLevelOneProfit}
                                />         
                                <Input 
                                label="Level Two Profit %"
                                placeholder="hint : 4"
                                value={levelTwoProfit}
                                setValue={setLevelTwoProfit}
                                />
                            </div>
                            <div className='mt-4'>
                                <Input 
                                label="Level Three Profit %"
                                placeholder="hint : 3"
                                value={levelThreeProfit}
                                setValue={setLevelThreeProfit}
                                />
                            </div>
                        </div>
                        
                        <div className='mt-4'>
                            <button 
                            type='submit' 
                            className='btn-primary py-2 px-12'
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

export default WebsiteSetupForm

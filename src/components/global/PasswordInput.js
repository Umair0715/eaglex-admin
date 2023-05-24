import React, { useState } from 'react'

const PasswordInput = ({ 
    label  , placeholder , value = '' , setValue=''
}) => {
    const [type , setType] = useState('password')

    return (
        <div className='flex flex-col gap-1.5 flex-1 w-full'>
            <label className='font-semibold text-grayText '>
                {label}
            </label>
            <div className='relative'>
                <input 
                type={type}
                placeholder={placeholder}
                className='input w-full'
                // value={value}
                // onChange={e => setValue(e.target.value)}
                />
                <div className='absolute top-1/2 sm:right-4 right-2 -translate-y-1/2 text-xl w-fit cursor-pointer text-gray-500'>
                    {
                        type === 'password' 
                        ? 
                            <i 
                            title='Show password' 
                            className="uil uil-eye" 
                            onClick={() => setType('text')}
                            />
                        : 
                            <i 
                            title='Show password' 
                            className="uil uil-eye-slash"
                            onClick={() => setType('password')}
                            />
                    }
                </div>
            </div>
        </div>
    )
}

export default PasswordInput
// import EyeSlashSvg from 'assets/svgs/EyeSlashSvg'
// import EyeSvg from 'assets/svgs/EyeSvg'
import React, { useState } from 'react'

const PasswordInput = ({ 
    label  , placeholder , value = '' , setValue='' , ...props
}) => {
    const [showPassword , setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className='flex flex-col gap-1.5 flex-1 w-full'>
            <label className='font-semibold text-dark '>
                {label}
            </label>
            <div className='relative'>
                <input 
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                className='input w-full'
                value={value}
                onChange={e => setValue(e.target.value)}
                {...props}
                />
                <div className='absolute top-1/2 sm:right-3 right-2 -translate-y-1/2 text-xl w-fit cursor-pointer text-gray-500'
                onClick={toggleShowPassword}
                >
                    {
                        showPassword ? <i className="uil uil-eye-slash" /> : <i className='uil uil-eye' />
                    }
                </div>
            </div>
        </div>
    )
}

export default PasswordInput
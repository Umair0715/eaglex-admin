import React from 'react'

const Input = ({ 
    label , type = 'text' , placeholder , value = '' , setValue='' , ...props
}) => {
    return (
        <div className='flex flex-col gap-2 flex-1 w-full'>
            <label className='font-semibold text-grayText '>
                {label}
            </label>
            <input 
            type={type}
            placeholder={placeholder}
            className='input w-full'
            value={value}
            onChange={e => setValue(e.target.value)}
            {...props}
            />
        </div>
    )
}

export default Input
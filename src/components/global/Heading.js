import React from 'react'

const Heading = ({ title , showIcon = true , icon = 'plus-circle'  }) => {
    return (
        <h1 className='font-semibold text-dark text-xl flex items-center gap-2'>
            { showIcon && <i className={`uil uil-${icon}`}></i> }
            <span>{title}</span>
        </h1>
    )
}

export default Heading
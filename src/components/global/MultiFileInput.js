import React from 'react'
import { useRef } from 'react';

const MultiFileInput = ({ label = 'Add Images' , images , setImages }) => {
    const imgRef = useRef(null);


    const handleFileChange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImages(prev => ([reader.result , ...prev]))
        }
    };

    return (
        <div>
            <div className='flex flex-col gap-2'>
                <label className='font-semibold text-gray-600'>
                    {label}
                </label>
                <input 
                type="file" 
                ref={imgRef}
                onChange={handleFileChange}
                hidden 
                />
                <div className='flex flex-wrap items-center gap-4'>
                {

                    images?.length > 0 && images?.map((item,i) => (
                        <div
                        key={i}
                        className='relative'
                        >
                            <img
                            src={item}
                            alt='Screenn'
                            className='w-[250px] h-[150px] object-cover rounded-md' 
                            />
                            <div 
                            className='absolute top-1 right-2 text-red-500  cursor-pointer text-xl'
                            onClick={() => {
                                setImages(prev => prev.filter(i => i !== item ))
                            }}
                            >
                                <i className="uil uil-trash"></i>
                            </div>
                        </div>
                    ))
                }
                    <div className='w-[150px] h-[150px] rounded-md border flex items-center justify-center text-5xl border-primary text-primary cursor-pointer'
                    onClick={() => imgRef.current.click() }
                    >
                        <i className="uil uil-plus"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MultiFileInput
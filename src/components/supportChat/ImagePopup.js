import { baseURL } from 'config/api';
import React, { useRef } from 'react'
import useClickOutside from 'utils/clickOutside';

const ImagePopup = ({ setShowImagePopup , selectedImage }) => {
    const popupRef = useRef(null);

    useClickOutside(popupRef , () => setShowImagePopup(false));

    return (
        <div className='fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-50 z-[999] '>
            <div className="absolute top-4 right-4 text-4xl font-semibold text-white cursor-pointer" 
            onClick={() => setShowImagePopup(false)}
            >
                <i className="uil uil-times"></i>
            </div>
            <div className='bg-white p-4 rounded-md' ref={popupRef}>
                <img 
                src={baseURL + selectedImage} 
                alt={selectedImage} 
                className='w-full h-full object-contain rounded-md'
                />
            </div>
        </div>
    )
}

export default ImagePopup
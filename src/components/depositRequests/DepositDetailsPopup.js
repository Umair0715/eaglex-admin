import Heading from 'components/global/Heading'
import Input from 'components/global/Input'
import SelectBox from 'components/global/SelectBox';
import { useRef } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import useClickOutside from 'utils/clickOutside';

const DepositDetailsPopup = ({ setShowDepositDetails }) => {
    const popupRef = useRef(null);

    useClickOutside(popupRef , () => setShowDepositDetails(false));

    return (
        <div className='fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-50 z-[99] px-2'>
            {/* CLOSE BTN */}
            <div className="absolute top-4 right-4 text-6xl text-white cursor-pointer w-fit">
                <i className="uil uil-times"></i>
            </div>

            <div 
            className='bg-white rounded-md md:w-[800px] w-full h-[500px] overflow-y-auto p-4'
            ref={popupRef}
            >
                <div className='flex items-center justify-center bg-gradientHover py-4 rounded-md text-white'>
                    <h1 className='text-xl font-semibold'>Deposit Details</h1>
                </div>
                <div className='mt-4 flex justify-between sm:flex-row flex-col gap-6'>
                    <div className='flex-[0.6]'>
                        <h3 className='text-lg font-bold text-black'>
                            Offer Details
                        </h3>
                        <div className='flex flex-col gap-2 mt-4'>
                            <div className='flex items-center gap-2'>
                                <p className='w-[150px] text-gray-800 font-semibold'>Name :</p>
                                <p>Opan</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p className='w-[150px] text-gray-800 font-semibold'>Company :</p>
                                <p>Tesla</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p className='w-[150px] text-gray-800 font-semibold'>Time Period :</p>
                                <p>5days</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p className='w-[150px] text-gray-800 font-semibold'>Offer Status :</p>
                                <p className='text-green-500'>Active</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex-[0.4]'>
                        <h3 className='text-lg font-bold text-black'>
                            User Details
                        </h3>
                        <div className='flex flex-col gap-2 mt-4'>
                            <div className='flex items-center gap-2'>
                                <p className='w-[150px] text-gray-800 font-semibold'>
                                    Name :
                                </p>
                                <p>Sabrina</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p className='w-[150px] text-gray-800 font-semibold'>
                                    Phone :
                                </p>
                                <p>03449948984</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p className='w-[150px] text-gray-800 font-semibold'>
                                    User Status :
                                </p>
                                <p className='text-red-500'>Blocked</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className='mt-8'>
                    <h3 className='text-lg font-bold text-black'>
                        Payment Details
                    </h3>
                    <div className='flex sm:items-center justify-around sm:flex-row flex-col gap-2 mt-4 '>
                        <div className='flex items-center gap-4'>
                            <p className=' text-gray-800 font-semibold'>
                                Deposit Amount :
                            </p>
                            <p>10,000</p>
                        </div>
                        <div className='flex items-center gap-4'>
                            <p className=' text-gray-800 font-semibold'>
                                Current Status :
                            </p>
                            <p className='text-orange-500'>Pending</p>
                        </div>
                        <div className='flex items-center gap-4'>
                            <p className=' text-gray-800 font-semibold'>
                                Transaction Id :
                            </p>
                            <p className='text-green-500'>#093490239</p>
                        </div>
                    </div>
                    <div className='my-8'>
                        <div className='flex items-center justify-center'>
                            <ReactImageMagnify {...{
                                smallImage: {
                                    alt: 'Wristwatch by Ted Baker London',
                                    isFluidWidth: true,
                                    src: 'https://png.pngtree.com/png-vector/20190303/ourmid/pngtree-coconut-milk-shampoo-receipt-printed-png-image_736459.jpg'
                                },
                                largeImage: {
                                    src: 'https://png.pngtree.com/png-vector/20190303/ourmid/pngtree-coconut-milk-shampoo-receipt-printed-png-image_736459.jpg',
                                    width: 800,
                                    height: 600
                                }
                            }} />
                        </div>
                    </div>
                    <div>
                        <SelectBox
                        label='Proceed'
                        options={[
                            { label : 'Approve' , value : 1 } ,
                            { label : 'Declined' , value : 2 } ,
                        ]}
                        />
                    </div>
                    <div className='btn-primary text-center py-3 px-20 my-8 w-fit'>
                        Done
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DepositDetailsPopup
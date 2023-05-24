import Heading from 'components/global/Heading'
import Input from 'components/global/Input'
import React from 'react'

const EditProfileForm = () => {
    return (
        <div>
            <Heading title='Update Profile' showIcon={false} />
            <div className='shadow-bg p-4 mt-4'>
                <form className='flex flex-col gap-4'>
                    <div className='flex sm:flex-row flex-col items-center gap-4'>
                        <Input 
                        label='First Name'
                        placeholder='Your First Name'
                        />
                        <Input 
                        label='Last Name'
                        placeholder='Your Last Name'
                        />
                    </div>
                    <div className='flex sm:flex-row flex-col items-center gap-4'>
                        <Input
                        label='Email'
                        placeholder='Ex : example@gmail.com'
                        />
                        <Input
                        type='number'
                        label='Phone Number'
                        placeholder='Ex : 03289423999'
                        />
                    </div>
                    <div className='mt-4 flex items-end justify-end'>
                        <button className="btn-primary py-2 px-12">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfileForm
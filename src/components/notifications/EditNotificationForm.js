import FileInput from 'components/global/FileInput';
import Input from 'components/global/Input'
import SelectBox from 'components/global/SelectBox';
import React, { useState } from 'react'

const EditNotificationForm = () => {
    const [name , setName] = useState('');

    return (
        <div className='mt-6 shadow-bg p-4'>
            <form className='flex flex-col gap-4'>
                <div className='flex sm:flex-row flex-col items-center gap-4'>
                    <Input
                    label='Title'
                    placeholder='Enter your tilte...'
                    />
                    <Input
                    label='Description'
                    placeholder='Description'
                    />
                </div>
                <SelectBox 
                    label='Status'
                    options={[
                        { label : 'Active' , value : 1  } ,
                        { label : 'Disable' , value : 2  } ,
                    ]} 
                />
                <div className="flex flex-col gap-2">
                    <label className='font-semibold text-grayText '>Description</label>
                    <textarea 
                    className='input resize-none'
                    placeholder='Write here...'
                    />
                </div>
                <div>
                    <FileInput label="Image *"/>
                </div>
                <div className='mt-4'>
                    <button className="btn-primary py-2 px-12">Save</button>
                </div>
            </form>
        </div>
    )
}

export default EditNotificationForm;
import FileInput from 'components/global/FileInput'
import Input from 'components/global/Input'
import React from 'react'

const NotificationForm = () => {
    return (
        <div>
            <form className='flex flex-col gap-4 shadow-bg p-4'>
                <Input 
                    label="Title" 
                    placeholder="New Notification"
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
                        <button type='button' className='btn-primary py-2 px-12'>
                            Send
                        </button>
                    </div>
            </form>
        </div>
    )
}

export default NotificationForm

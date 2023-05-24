import Heading from 'components/global/Heading'
import PasswordInput from 'components/global/PasswordInput'

const UpdatePassword = () => {
    return (
        <div>
            <Heading title='Update Password' showIcon={false} />
            <div className='shadow-bg p-4 mt-4'>
                <form className='flex flex-col gap-4'>
                    <div className='flex sm:flex-row flex-col items-center gap-4'>
                        <PasswordInput 
                        label='Current Password'
                        placeholder='Enter Your Current Password'
                        />
                        <PasswordInput
                        label='New Password'
                        placeholder='Ex : **************'
                        />
                    </div>
                    <PasswordInput
                    label='Confirm New Password'
                    placeholder='Ex : *************'
                    />
                        
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

export default UpdatePassword
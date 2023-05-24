import Heading from 'components/global/Heading';
import Layout from 'components/global/Layout';
import Chatbox from 'components/supportChat/Chatbox';
import Conversations from 'components/supportChat/Conversations';
import { useState } from 'react';

const SupportChat = () => {
    const [selectedChat , setSelectedChat] = useState({});

    return (
        <Layout>
            <div>
                <div>
                    <Heading title='Conversations' icon='envelope' />
                </div>
                <div className='flex mt-6 gap-8'>
                    <div className='flex-[0.3]'>
                        <Conversations 
                        selectedChat={selectedChat} 
                        setSelectedChat={setSelectedChat} 
                        />
                    </div>
                    <div className='flex-[0.7] w-full h-full'>
                        <Chatbox selectedChat={selectedChat} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SupportChat
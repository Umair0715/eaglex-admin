import Heading from 'components/global/Heading';
import Layout from 'components/global/Layout';
import Chatbox from 'components/supportChat/Chatbox';
import Conversations from 'components/supportChat/Conversations';
import { useEffect, useState } from 'react';
import NewChatPopup from './NewChatPopup';
import { useChatContext } from 'context/chatContext';

const SupportChat = () => {
    const { selectedChat , setSelectedChat } = useChatContext();
    const [newChat , setNewChat] = useState(false);

    useEffect(() => {
        setSelectedChat(null);
    }, [])

    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between'>
                    <Heading title='Conversations' icon='envelope' />
                    <div>
                        <button 
                        className="btn-primary py-2 px-12"
                        onClick={() => setNewChat(true)}
                        >
                            New Chat 
                        </button>
                    </div>
                </div>
                <div className='flex mt-6 gap-8'>
                    <div className='flex-[0.3]'>
                        <Conversations />
                    </div>
                    <div className='flex-[0.7] w-full h-full'>
                        <Chatbox  />
                    </div>
                </div>
            </div>
            { newChat && <NewChatPopup setNewChat={setNewChat} />}
        </Layout>
    )
}

export default SupportChat
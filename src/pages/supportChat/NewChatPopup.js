import Heading from 'components/global/Heading'
import Search from 'components/global/Search'
import Axios, { baseURL } from 'config/api'
import { useChatContext } from 'context/chatContext'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import useClickOutside from 'utils/clickOutside'
import toastError from 'utils/toastError'

const NewChatPopup = ({ setNewChat }) => {
    const chatPopupRef = useRef(null);
    const { setSelectedChat , setAllChats , setChats } = useChatContext();

    const { user } = useSelector(state => state.auth);
    const [users , setUsers] = useState([]); 
    const [loading , setLoading] = useState(false);
    const [search , setSearch] = useState('');
    const [createLoading , setCreateLoading] = useState(false);

    useClickOutside(chatPopupRef , () => setNewChat(false));
    

    const searchFetcher = async (value) => {
        try {
            setLoading(true);
            const { data : { data : { docs } } } = await Axios.get(`/user/search?keyword=${value}` , {
                headers : {
                    Authorization : `Bearer ${user?.token}`
                }
            });
            setUsers(docs);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toastError(error);
        }
    }

    const createChatHandler = async (userId) => {
        try {
            setCreateLoading(true);
            const { data : { data : { doc } } } = await Axios.post(`/chat` , {
                userId 
            });
            setSelectedChat(doc);
            setAllChats(prev => ([doc , ...prev]));
            setChats(prev => ([doc , ...prev]));
            setNewChat(false);
            setCreateLoading(false);
        } catch (error) {
            setCreateLoading(false);
            toastError(error);
        }
    }

    return (
        <div className='fixed top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center z-[999] w-full min-h-screen px-6 py-8'>
            <div 
            className='sm:w-[500px] w-full bg-white rounded-md p-4 relative'
            ref={chatPopupRef}
            >
                <div 
                className='absolute top-1 right-2 text-2xl cursor-pointer' 
                onClick={() => setNewChat(false)}
                >
                    <i className="uil uil-times"></i>
                </div>
                <div className='text-2xl font-semibold text-primary text-center mb-4'>
                    <h1>Create New Chat</h1>
                </div>
                <div>
                    <Search 
                    setSearch={setSearch} 
                    fetcher={searchFetcher} 
                    placeholder='Search users here'
                    />
                </div>
                <div className='w-full min-h-[100px] max-h-[300px] overflow-auto flex flex-col gap-2 mt-4'>
                    {
                        loading 
                        ? 
                            <div className='flex items-center justify-center w-full h-full'>
                                <ClipLoader size={20} />
                            </div>
                        : 
                        users?.length > 0 
                        ?
                            createLoading
                            ?
                                <div className='flex items-center justify-center w-full h-full'>
                                    <p className='font-semibold'>Creating new chat...</p>
                                </div>
                            :
                            users?.map(item => (
                                <div 
                                key={item?._id}
                                className='flex items-center gap-4 hover:bg-gray-100 rounded-md py-2 cursor-pointer px-2'
                                onClick={() => createChatHandler(item?._id)}
                                >
                                    <div className='border rounded-full '>
                                        <img 
                                        src={baseURL + '/user/' + item?.image} 
                                        alt={item?.firstName} 
                                        className='w-[40px] h-[40px] object-cover rounded-full'
                                        />
                                    </div>
                                    <div>
                                        <p>
                                            {item?.firstName + ' ' + item?.lastName}
                                        </p>
                                        <p className='text-[13px] -translate-y-1 text-gray-400'>{item?.phone}</p>
                                    </div>
                                </div>
                            ))
                        : 
                            <div className='flex items-center justify-center text-xl font-semibold w-full h-[100px]'>
                                <p>No User found.</p>
                            </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default NewChatPopup
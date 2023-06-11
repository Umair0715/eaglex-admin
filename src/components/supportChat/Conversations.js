import { baseURL } from "config/api";
import { useChatContext } from "context/chatContext";
import { conversations } from "data/conversations";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { io } from "socket.io-client";
import fetcher from "utils/fetcher";


const Conversations = () => {
    const { selectedChat  , setSelectedChat , allChats , setAllChats , chats , setChats } = useChatContext();
    const [socket , setSocket] = useState(null);

    const { user } = useSelector(state => state.auth);

    const queryKey = 'fetch-chats';
    const { isLoading , data } = useQuery(queryKey , () => fetcher('/chat/admin' , user))

    useEffect(() => {
        if(data) {
            setChats(() => data?.data?.data?.docs?.sort((a, b) => {
                if (a?.latestMessage?.status === 'unread' && b?.latestMessage?.status === 'read') {
                    return -1; // 'unread' status comes first
                } else if (a?.latestMessage?.status === 'read' && b?.latestMessage?.status === 'unread') {
                    return 1; 
                } else {
                    return 0; 
                }
            }));
            setAllChats(data?.data?.data?.docs)
        }
    }, [data])
    
    const handleSearch = (e) => {
        const query = e.target.value;
        var updatedChats = [...allChats];
        if(query.length > 0){
            updatedChats = updatedChats.filter((item) => {
                return item.chatName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ;
            });
            setChats(updatedChats);
        }else {
            return setChats(allChats)
        }
    }

    useEffect(() => {
        setSocket(io(baseURL))
    }, []);

    useEffect(() => {
        if(!socket) return;

    }, [socket])

    const selectChatHanlder = (newChat) => {
        if(selectedChat) {
            socket?.emit('leave-chat' , selectedChat);
        }
        setChats(chats => {
            return chats?.map(chat => {
                if(chat?.latestMessage?.status === 'unread' && newChat?._id === chat?._id) {
                    return {...chat , latestMessage : {...chat?.latestMessage , status : 'read'}}
                }
                return chat;
            })
        })
        setSelectedChat(newChat);
    }


    return (
        <div>
            <div>
                <input 
                type="text" 
                className=' rounded-full py-2 px-4 border focus:border-blue-500 outline-none w-full'
                placeholder='Search...'
                onChange={handleSearch}
                />
            </div>
            <div className='shadow-bg mt-4 h-[500px] overflow-auto'>
                {
                    isLoading
                    ? 
                        <div className="flex items-center justify-center w-full h-full">
                            <ClipLoader size={20} />
                        </div>
                    :
                    chats?.length > 0
                    ?
                        chats?.map(chat => (
                            <div className={`flex items-center gap-4 py-4 px-4  cursor-pointer border-b
                            ${selectedChat?._id === chat?._id ? 'bg-primary text-pure hover:bg-primary rounded-md' : 'hover:bg-gray-200'}
                            `}
                            onClick={() => selectChatHanlder(chat)}
                            key={chat?._id}
                            >
                                <div className="rounded-full border p-1">
                                    <img 
                                    src={baseURL + chat?.user?.image} 
                                    alt={chat?.chatName} 
                                    className='w-[40px] h-[40px] rounded-full object-cover'
                                    />
                                </div>
                                <div>
                                    <p>{chat?.chatName}</p>
                                    <p className={`${selectedChat?._id === chat?._id ? 'text-gray-100' : 'text-gray-500'} text-[13px] -translate-y-1`}>{chat?.user?.phone}</p>
                                </div>
                                {
                                    chat?.latestMessage?.status === 'unread' && selectedChat?._id !== chat?._id && chat?.latestMessage?.sender?._id !== user?._id
                                    ?
                                        <div className="text-[10px] bg-purple-500 rounded-full py-[1px] px-1 text-white">
                                            new message
                                        </div>
                                    : ''
                                }
                            </div>
                        ))
                    : 
                        <div className="flex items-center justify-center text-xl font-semibold w-full h-full text-gray-600">
                            No Conversation Found.
                        </div>
                }
            </div>
        </div>
    )
}


export default Conversations
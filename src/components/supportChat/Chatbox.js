import Axios, { baseURL } from 'config/api';
import { useChatContext } from 'context/chatContext';
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import ScrollableFeed from 'react-scrollable-feed'
import { ClipLoader, HashLoader } from 'react-spinners';
import toastError from 'utils/toastError';
import { io } from 'socket.io-client';
import TimeAgo from 'react-timeago'

const Chatbox = () => {
    const { selectedChat } = useChatContext();
    const [messages , setMessages] = useState([]);
    const [loading , setLoading] = useState(false);
    const [message , setMessage] = useState('');
    const [sendMessageLoading , setSendMessageLoading] = useState(false);
    const [newMessage , setNewMessage] = useState('');
    const [messageType , setMessageType] = useState('text');
    const [fileName , setFileName] = useState('');

    const [socket , setSocket] = useState(null);
    const { user } = useSelector(state => state.auth);

    const imgRef = useRef();

    useEffect(() => {
        setSocket(io(baseURL))
    }, []);

    useEffect(() => {
        if(!socket) return; 
        if(selectedChat) {
            socket?.emit('join-chat' , selectedChat)
        }

        socket.on('new-message-recieved', (message) => {
            setNewMessage(message)
        })
    }, [socket , selectedChat])

    useEffect(() => {
        if(newMessage) {
            setMessages(prev => ([...prev , newMessage]))
        }
    }, [newMessage])

    useEffect(() => {
        if(selectedChat) {
            const fetchMessages = async () => {
                try {
                    setLoading(true);
                    const { data : { data : { docs } } } = await Axios.get(`/message/${selectedChat?._id}`);
                    setMessages(docs);
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    toastError(error);
                }
            }
            fetchMessages();
        }
    }, [selectedChat]);

    const sendMessageHandler = async (e) => {
        e.preventDefault();
        const newMessageData = {
            message ,
            sender : user ,
            chatId : selectedChat._id ,
            type : messageType ,
            senderType : "Admin"
        }

        try {
            setSendMessageLoading(true);
            const { data : { data : { doc } } } = await Axios.post('/message' , newMessageData );
            setMessages(prev => [...prev , doc]);
            socket?.emit('new-message' , doc);
            setMessage('');
            setFileName('');
            setMessageType('text')
            setSendMessageLoading(false);
        } catch (error) {
            setSendMessageLoading(false);
            toastError(error);
        }
    }

    const chatContainerRef = useRef(null);

    useEffect(() => {
        if(!chatContainerRef.current) return;
        chatContainerRef.current.scrollTop = chatContainerRef?.current?.scrollHeight;
    }, [messages , chatContainerRef]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setMessageType('file');
        setFileName(file?.name);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setMessage(reader.result);
        }
    }

    return (
        <div className='w-full shadow-bg'>
            {
                selectedChat 
                ? 
                    <div>
                        <div className='py-4 px-4 flex items-center gap-4 border-b'>
                            <div className='border rounded-full p-1'>
                                <img 
                                src={baseURL + '/user/' + selectedChat?.user?.image} 
                                alt={selectedChat?.user?.firstName} 
                                className='w-[50px] h-[50px] rounded-full object-cover'
                                />
                            </div>
                            <div className='font-semibold'>
                                <p>{selectedChat?.chatName}</p>
                                <p className='text-sm text-gray-500'>{selectedChat?.user?.phone}</p>
                            </div>
                        </div>
                        {
                            loading 
                            ? 
                                <div className='w-full h-[350px] flex items-center justify-center'>
                                    <HashLoader size={25} />
                                </div>
                            :
                            messages?.length > 0
                            ? 
                                <ScrollableFeed>
                                    <div className='flex flex-col gap-4 p-4 h-[350px] overflow-auto '
                                    ref={chatContainerRef}>
                                        {
                                            messages?.map((item , i) => (
                                                <div 
                                                className={`
                                                ${item?.sender?._id === user?._id  ? 'flex justify-end' : ''}`} 
                                                key={i}>
                                                    <div className='flex flex-col '>
                                                    {
                                                        item?.type === 'text' 
                                                        ? 
                                                        <div className={`w-fit max-w-[400px] rounded-md border p-3 text-[15px] 
                                                        ${item?.sender?._id === user?._id ? "bg-primary text-white" : "bg-gray-200 text-black"}
                                                        `}>
                                                            {item?.message}
                                                        </div>
                                                        : 
                                                        <div className={`w-fit max-w-[300px] max-h-[250px] h-auto rounded-md border p-3 text-[15px] 
                                                        ${item?.sender?._id === user?._id ? "bg-primary text-white" : "bg-gray-200 text-black"}
                                                        `}>
                                                            <img 
                                                            src={baseURL + item?.message}
                                                            alt="" 
                                                            className='w-full h-[230px] object-cover rounded-md'
                                                            />
                                                        </div>
                                                    }
                                                    {/* <div className='text-xs '>
                                                        <TimeAgo date={new Date(item?.createdAt)} />
                                                    </div> */}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </ScrollableFeed>
                            :
                                <div className='w-full h-[350px] flex items-center justify-center font-semibold text-lg'>
                                    No Message Found.
                                </div>

                        }
                        <div className='w-full table-header-shadow rounded-md flex items-center gap-3 mt-4 border-t border-t-gray-300'>
                            <form 
                            className='flex items-center justify-between w-full px-3 gap-4 py-6'
                            onSubmit={sendMessageHandler}
                            >
                                <div className='w-fit'>
                                    <input 
                                    type="file" 
                                    ref={imgRef} 
                                    onChange={handleFileChange}
                                    hidden 
                                    />
                                    <div className='cursor-pointer round-shadow rounded-full w-[40px] h-[40px] bg-gray-200 flex items-center justify-center text-xl'
                                    onClick={() => imgRef.current.click() }>
                                       <i className="uil uil-camera"></i>
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <input 
                                    placeholder='Write message here...'
                                    className='rounded-full w-full py-2 px-4   bg-transparent outline-none  border border-gray-400 focus:border-primary'
                                    value={messageType === 'file' ? fileName : message}
                                    onChange={e => setMessage(e.target.value)}
                                    readOnly={messageType==='file'}
                                    />
                                </div>
                                <div className='flex-[0.1]'>
                                    <button 
                                    className='btn-primary py-2 px-4'
                                    disabled={!message || sendMessageLoading}
                                    >
                                        {
                                            sendMessageLoading 
                                            ? 
                                                <ClipLoader size={20} color='white' />
                                            : 
                                                'Send'
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                : 
                    <div className=' flex items-center justify-center text-grayText font-semibold text-2xl w-full h-[510px]'>
                        No Chat is Selected
                    </div>
            }
        </div>
    )
}

export default Chatbox
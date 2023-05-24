import { conversations } from "data/conversations";
import { useEffect, useState } from "react";


const Conversations = ({ selectedChat  , setSelectedChat }) => {
    const [chats , setChats] = useState(conversations);
    
    const handleSearch = (e) => {
        const query = e.target.value;
        var updatedChats = [...conversations];
        if(query.length > 0){
            updatedChats = updatedChats.filter((item) => {
                return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ;
            });
            setChats(updatedChats);
        }else {
            return setChats(conversations)
        }
    }

    useEffect(() => {
        setSelectedChat(chats[0])
    }, [])

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
                    chats?.map(chat => (
                        <div className={`flex items-center justify-between py-4 px-4  cursor-pointer border-b
                        ${selectedChat?.id === chat?.id ? 'bg-primary text-pure hover:bg-primary rounded-md' : 'hover:bg-gray-200'}
                        `}
                        onClick={() => setSelectedChat(chat)}
                        key={chat?.id}
                        >
                            <div>
                                <img 
                                src={chat?.image} 
                                alt={chat?.name} 
                                className='w-[50px] h-[50px] rounded-full'
                                />
                            </div>
                            <div>
                                <span>{chat?.name}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Conversations
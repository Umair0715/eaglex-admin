import { createContext , useContext , useState } from "react";

const ChatContext = createContext();
export const useChatContext = () => useContext(ChatContext);

const ChatContextProvider = ({ children }) => {
    const [selectedChat , setSelectedChat] = useState(null);
    const [allChats , setAllChats] = useState([]);
    const [chats , setChats] = useState(allChats);

    return (
        <ChatContext.Provider
            value={{
                selectedChat , setSelectedChat ,
                allChats , setAllChats , 
                chats , setChats
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider;
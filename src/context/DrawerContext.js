import { useContext , createContext , useState } from "react";

const DrawerContext = createContext();

export const useDrawerContext = () => useContext(DrawerContext)

const DrawerContextProvider = ({ children }) => {
    const [showDrawer , setShowDrawer] = useState(false);

    return (
        <DrawerContext.Provider 
            value={{
                showDrawer , setShowDrawer ,
            }}
        >
            {children}
        </DrawerContext.Provider>
    )
}

 
export default DrawerContextProvider;
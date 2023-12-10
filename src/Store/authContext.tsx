import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext()

interface authProps {
    children: React.ReactNode
}

interface userData {
    email: string
    name:string
    role:string
}

 export const authContextProvider ({children}: authProps)=> {

    const [isLoggedIn, setIsLoaggedIn] = useState<boolean>(false)
      const [isUser, setIsUser] = useState<userData | null >(null)
    
   const value = {

isLoggedIn,
setIsLoaggedIn,
isUser,
setIsUser

    }

    return <authContext.Provider value={value}>
    

    {children}
    </authContext.Provider>
}



export const useAuthContx = ()=> {

    return useContext(authContext)
}
import { createContext, useEffect, useState } from "react";
import type {  User } from "../../Pages/Login/login.interface";
import { getUserData } from "../../Pages/Login/login.api";


type AuthContext = {
    userData : User | null,
    setUserData: React.Dispatch<React.SetStateAction<User|null>>
}

export const UserTokenProvider = createContext<AuthContext>({
    userData: null,
    setUserData : () => {}
});

// localStorage.getItem("user_token") 

export function AuthUserContextProvider({ children  }:{children: React.ReactNode}) {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(function(){
    if(localStorage.getItem("user_token")){
      getUserData().then(function(data){ setUserData(data)})
    }
  },[])
  

  return (
    <>
    <UserTokenProvider value={{userData , setUserData }}>
      {children }
    </UserTokenProvider>
    </>
  );
}

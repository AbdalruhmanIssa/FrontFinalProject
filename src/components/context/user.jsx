import { jwtDecode } from "jwt-decode"
import  { useEffect, useState,createContext } from 'react'

export const UserContext=createContext();

const UserContextProvider= ({children})=>{


    const [isLogin, setIsLogin] = useState(localStorage.getItem("userToken") ? true : false);
    const [userData, setUserData] = useState({});
  
  useEffect( ()=>{
    const token = localStorage.getItem("userToken");
    if (token) {
        setIsLogin(true);
        const decoded = jwtDecode(token);
        setUserData(decoded);
    }
  }, []);
return <UserContext.Provider value={{isLogin,setIsLogin,userData,setUserData}}>
    {children}
    </UserContext.Provider>
}
export default UserContextProvider;
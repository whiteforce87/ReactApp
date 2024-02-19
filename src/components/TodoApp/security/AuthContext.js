import { createContext, useState, useContext } from "react";
import { executeBasicAuthentication } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)



export default function AuthProvider({children}){

    const [isAuthenticated,setAuthenticated] = useState(false)

    const [username,setUsername] = useState(null)
    const [token,setToken] = useState(null)


/*
    function login(username, password){
        if(username === "fatih" && password === "dummy"){
            setAuthenticated(true)
            setUsername(username)
            return true

        }else{
            setAuthenticated(false)
            setUsername(null)
            return false

        }
    }
*/


   async function login(username, password){

        const basicAuthToken = 'Basic ' + window.btoa(username + ":" + password)

        try{
            
        const response = await executeBasicAuthentication(basicAuthToken)

        if(response.status === 200){
            setAuthenticated(true)
            setUsername(username)
            setToken(basicAuthToken)

            apiClient.interceptors.request.use(
                (config) => {config.headers.Authorization=basicAuthToken
                return config
                }
            )
            return true

        }else{
            logout()
            return false

        }
    }catch{
        logout()
        return false
    }
    }

    function logout(){
        setAuthenticated(false)
        setUsername(null)
        setToken(null)

    }

    return (
            <AuthContext.Provider value={ { isAuthenticated, login, logout, username, token }}>
                {children}
            </AuthContext.Provider>
    )
}